import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import {
  selectBooks,
  remove,
  selectLoadingState,
  loadData,
  selectRemoveState,
} from "./booksSlice";

const List: React.FC = () => {
  const books = useSelector(selectBooks);
  const loadingState = useSelector(selectLoadingState);
  const removeState = useSelector(selectRemoveState);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadData());
  }, [dispatch]);

  if (loadingState === "pending") {
    return <div>...loading</div>;
  } else if (loadingState === "error") {
    return <div>Ein Fehler ist aufgetreten!</div>;
  } else {
    return (
      <>
        {removeState === "pending" && <div>Datensatz wird gelöscht</div>}
        {removeState === "error" && (
          <div>Beim Löschen ist ein Fehler aufgetreten</div>
        )}
        <table>
          <thead>
            <tr>
              <td>Titel</td>
              <td>Autor</td>
              <td>ISBN</td>
              <td></td>
              <td></td>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>
                  <button onClick={() => dispatch(remove(book.id))}>
                    löschen
                  </button>
                </td>
                <td>
                  <button onClick={() => navigate(`/edit/${book.id}`)}>
                    bearbeiten
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={() => navigate("/new")}>neu</button>
      </>
    );
  }
};

export default List;
