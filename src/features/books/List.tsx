import React from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../../app/hooks";
import { selectBooks, remove } from "./booksSlice";

const List: React.FC = () => {
  const books = useSelector(selectBooks);
  const dispatch = useAppDispatch();

  return (
    <table>
      <thead>
        <tr>
          <td>Titel</td>
          <td>Autor</td>
          <td>ISBN</td>
        </tr>
      </thead>
      <tbody>
        {books.map((book) => (
          <tr key={book.id}>
            <td>{book.title}</td>
            <td>{book.author}</td>
            <td>{book.isbn}</td>
            <td>
              <button onClick={() => dispatch(remove(book.id))}>Löschen</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default List;
