import { createSelector, createSlice } from '@reduxjs/toolkit';
import { ActionType, getType } from 'typesafe-actions';
import { RootState } from '../../app/store';
import { Book, InputBook } from './Book';
import { loadDataAction, removeAction, saveAction } from './books.actions';

export type BooksState = {
  books: Book[];
  loadingState: null | 'pending' | 'completed' | 'error';
  removeState: null | 'pending' | 'completed' | 'error';
  saveState: null | 'pending' | 'completed' | 'error';
  ratingFilter: number;
};

export const booksSlice = createSlice({
  name: 'books',
  initialState: {
    books: [],
    loadingState: null,
    removeState: null,
    saveState: null,
    ratingFilter: 0,
  } as BooksState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getType(loadDataAction.request), (state) => {
        state.loadingState = 'pending';
      })
      .addCase(
        getType(loadDataAction.success),
        (state, action: ActionType<typeof loadDataAction.success>) => {
          state.loadingState = 'completed';
          state.books = action.payload;
        }
      )
      .addCase(getType(loadDataAction.failure), (state) => {
        state.loadingState = 'error';
      });

    builder
      .addCase(getType(removeAction.request), (state) => {
        state.removeState = 'pending';
      })
      .addCase(
        getType(removeAction.success),
        (state, action: ActionType<typeof removeAction.success>) => {
          state.removeState = 'completed';
          const index = state.books.findIndex(
            (book) => book.id === action.payload
          );
          state.books.splice(index, 1);
        }
      )
      .addCase(getType(removeAction.failure), (state) => {
        state.removeState = 'error';
      });

    builder
      .addCase(getType(saveAction.request), (state) => {
        state.saveState = 'pending';
      })
      .addCase(
        getType(saveAction.success),
        (state, action: ActionType<typeof saveAction.success>) => {
          if (action.payload.id) {
            const index = state.books.findIndex(
              (book) => book.id === action.payload.id
            );
            state.books[index] = action.payload as Book;
          } else {
            state.books.push(action.payload);
          }
        }
      )
      .addCase(getType(saveAction.failure), (state) => {
        state.saveState = 'error';
      });
  },
});

export const selectBooks = (state: RootState) => state.books.books;
export const selectLoadingState = (state: RootState) =>
  state.books.loadingState;
export const selectRemoveState = (state: RootState) => state.books.removeState;
export const selectSaveState = (state: RootState) => state.books.saveState;
export const selectRatingFilter = (state: RootState) =>
  state.books.ratingFilter;

export const selectByRating = createSelector(
  [selectBooks, selectRatingFilter],
  (books, ratingFilter) => {
    if (ratingFilter === 0) {
      return books;
    }
    return books.filter((book) => book.rating === ratingFilter);
  }
);

export function selectBook(state: RootState): (id?: number) => InputBook {
  return (id?: number): InputBook => {
    const book = selectBooks(state).find((book) => book.id === id);
    if (!book) {
      return {
        title: '',
        author: '',
        isbn: '',
      };
    }
    return book;
  };
}

export default booksSlice.reducer;
