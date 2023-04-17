import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { save, selectBook, selectSaveState } from "./booksSlice";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch } from "../../app/hooks";
import { InputBook } from "./Book";

const Form: React.FC = () => {
  const getBook = useSelector(selectBook);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm<InputBook>({
    defaultValues: { title: "", author: "", isbn: "" },
  });

  const saveState = useSelector(selectSaveState);

  const { id } = useParams<{ id?: string }>();

  useEffect(() => {
    if (id) {
      const book = getBook(parseInt(id, 10));
      reset(book);
    }
  }, [id, reset, getBook]);
  return (
    <>
      {saveState === "pending" && <div>Daten werden gespeichert.</div>}
      {saveState === "error" && <div>Es ist ein Fehler aufgetreten.</div>}
      <form
        onSubmit={handleSubmit((data) => {
          dispatch(save(data));
          navigate("/list");
        })}
      >
        <div>
          <label htmlFor="title">Titel:</label>
          <input type="text" {...register("title")} />
        </div>
        <div>
          <label htmlFor="author">Autor:</label>
          <input type="text" {...register("author")} />
        </div>
        <div>
          <label htmlFor="isbn">ISBN:</label>
          <input type="text" {...register("isbn")} />
        </div>
        <div>
          <button type="submit">speichern</button>
        </div>
      </form>
    </>
  );
};
export default Form;
