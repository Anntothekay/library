import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { selectBooks, remove } from "./booksSlice";

const List: React.FC = () => {
  const books = useSelector(selectBooks);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <>
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
};
export default List;
