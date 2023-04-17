import {
  createAsyncThunk,
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { Book, InputBook } from "./Book";

export type BooksState = {
  books: Book[];
  loadingState: null | "pending" | "completed" | "error";
  removeState: null | "pending" | "completed" | "error";
  saveState: null | "pending" | "completed" | "error";
  ratingFilter: number;
};

export const loadData = createAsyncThunk(
  "books/loadData",
  async (obj, { rejectWithValue }) => {
    try {
      const response = await fetch("http://localhost:3001/books");
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return Promise.reject();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const save = createAsyncThunk(
  "books/save",
  async (book: InputBook, { rejectWithValue }) => {
    try {
      let url = "http://localhost:3001/books";
      let method = "POST";
      if (book.id) {
        url += `/${book.id}`;
        method = "PUT";
      }
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(book),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      }
      return Promise.reject();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const remove = createAsyncThunk(
  "books/remove",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await fetch(`http://localhost:3001/books/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        return id;
      }
      return Promise.reject();
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const booksSlice = createSlice({
  name: "books",
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
      .addCase(loadData.pending, (state) => {
        state.loadingState = "pending";
      })
      .addCase(loadData.fulfilled, (state, action) => {
        state.loadingState = "completed";
        state.books = action.payload;
      })
      .addCase(loadData.rejected, (state) => {
        state.loadingState = "error";
      });
    builder
      .addCase(save.pending, (state) => {
        state.saveState = "pending";
      })
      .addCase(save.fulfilled, (state, action) => {
        if (action.payload.id) {
          const index = state.books.findIndex(
            (book) => book.id === action.payload.id
          );
          state.books[index] = action.payload as Book;
        } else {
          state.books.push(action.payload);
        }
      })
      .addCase(save.rejected, (state) => {
        state.saveState = "error";
      });
    builder
      .addCase(remove.pending, (state) => {
        state.removeState = "pending";
      })
      .addCase(remove.fulfilled, (state, action) => {
        state.removeState = "completed";
        const index = state.books.findIndex(
          (book) => book.id === action.payload
        );
        state.books.splice(index, 1);
      })
      .addCase(remove.rejected, (state) => {
        state.removeState = "error";
      });
  },
});

export const selectBooks = (state: RootState) => state.books.books;
export const selectLoadingState = (state: RootState) =>
  state.books.loadingState;
export const selectSaveState = (state: RootState) => state.books.saveState;
export const selectRemoveState = (state: RootState) => state.books.removeState;
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
