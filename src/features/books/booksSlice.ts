import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";

import { Book, InputBook } from "./Book";
import booksData from "./booksData";

export type BooksState = {
  books: Book[];
  ratingFilter: number;
};

export const booksSlice = createSlice({
  name: "books",
  initialState: { books: booksData, ratingFilter: 0 },
  reducers: {
    remove(state, action: PayloadAction<number>) {
      const index = state.books.findIndex((book) => book.id === action.payload);
      state.books.splice(index, 1);
    },
    save(state, action: PayloadAction<InputBook>) {
      if (action.payload.id) {
        const index = state.books.findIndex(
          (book) => book.id === action.payload.id
        );
        state.books[index] = action.payload as Book;
      } else {
        const nextId = Math.max(...state.books.map((book) => book.id)) + 1;
        state.books.push({ ...action.payload, id: nextId });
      }
    },
  },
});

export const { remove, save } = booksSlice.actions;

export const selectBooks = (state: RootState) => state.books.books;
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
        title: "",
        author: "",
        isbn: "",
      };
    }
    return book;
  };
}

export default booksSlice.reducer;
