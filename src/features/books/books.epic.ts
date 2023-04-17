import { combineEpics, ofType, Epic } from "redux-observable";
import { from, of } from "rxjs";
import { map, catchError, switchMap } from "rxjs/operators";
import { loadDataAction, removeAction, saveAction } from "./books.actions";

const loadData: Epic = (action$) =>
  action$.pipe(
    ofType(loadDataAction.request),
    switchMap(() =>
      from(
        fetch("http://localhost:3001/books").then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            return Promise.reject();
          }
        })
      ).pipe(
        map((data) => loadDataAction.success(data)),
        catchError((err) => of(loadDataAction.failure(err)))
      )
    )
  );

const remove: Epic = (action$) =>
  action$.pipe(
    ofType(removeAction.request),
    switchMap(({ payload: id }) =>
      from(
        fetch(`http://localhost:3001/books/${id}`, {
          method: "DELETE",
        }).then((response) => {
          if (response.ok) {
            return Promise.resolve();
          } else {
            return Promise.reject();
          }
        })
      ).pipe(
        map(() => removeAction.success(id)),
        catchError((err) => of(removeAction.failure(err)))
      )
    )
  );

const save: Epic = (action$) =>
  action$.pipe(
    ofType(saveAction.request),
    switchMap(({ payload: book }) => {
      let url = "http://localhost:3001/books";
      let method = "POST";
      if (book.id) {
        url += `/${book.id}`;
        method = "PUT";
      }
      const fetchPromise = fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      }).then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          return Promise.reject();
        }
      });
      return from(fetchPromise).pipe(
        map((data) => saveAction.success(data)),
        catchError((err) => of(saveAction.failure(err)))
      );
    })
  );

export default combineEpics(loadData, remove, save);
