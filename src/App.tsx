import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import NewBook from "./books/pages/NewBook";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Users from "./users/pages/Users";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <MainNavigation />
        <main>
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/livros/novo" element={<NewBook />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
