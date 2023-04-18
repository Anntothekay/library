import { combineEpics } from "redux-observable";
import booksEpic from "../features/books/books.epic";
import loginEpic from "../features/login/login.Epic";
export default combineEpics(booksEpic, loginEpic);
