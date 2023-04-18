import React, { ChangeEvent, FormEvent, useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { loginAction } from "./login.actions";

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    dispatch(loginAction.request(credentials));
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Benutzername: </label>
        <input
          type="text"
          value={credentials.username}
          onChange={handleChange}
          name="username"
          id="username"
        />
      </div>
      <div>
        <label htmlFor="password">Passwort: </label>
        <input
          type="password"
          value={credentials.password}
          onChange={handleChange}
          name="password"
          id="password"
        />
      </div>
      <button type="submit">anmelden</button>
    </form>
  );
};
export default Login;
