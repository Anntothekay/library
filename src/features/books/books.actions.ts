import { createAsyncAction } from "typesafe-actions";
import { Book, InputBook } from "./Book";

export const loadDataAction = createAsyncAction(
  "books/loadData/pending",
  "books/loadData/fulfilled",
  "books/loadData/rejected"
)<void, Book[], void>();

export const removeAction = createAsyncAction(
  "books/remove/pending",
  "books/remove/fulfilled",
  "books/remove/rejected"
)<number, number, void>();

export const saveAction = createAsyncAction(
  "books/save/pending",
  "books/save/fulfilled",
  "books/save/rejected"
)<InputBook, Book, void>();
