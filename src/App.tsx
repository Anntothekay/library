import React from "react";
import "./App.css";
import List from "./features/books/List";
import Form from "./features/books/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectToken } from "./features/login/loginSlice";
import Login from "./features/login/Login";
const App: React.FC = () => {
  const token = useSelector(selectToken);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit/:id" element={token ? <Form /> : <Login />} />
        <Route path="/new" element={token ? <Form /> : <Login />} />
        <Route path="/list" element={token ? <List /> : <Login />} />
        <Route path="/" element={token ? <Navigate to="/list" /> : <Login />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
