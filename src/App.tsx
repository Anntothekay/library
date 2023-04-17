import React from "react";
import "./App.css";
import List from "./features/books/List";
import Form from "./features/books/Form";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/edit/:id" element={<Form />} />
        <Route path="/new" element={<Form />} />
        <Route path="/list" element={<List />} />
        <Route path="/" element={<Navigate to="/list" />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
