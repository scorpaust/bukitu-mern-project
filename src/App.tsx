import React, { useCallback, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import NewBook from "./books/pages/NewBook";
import UpdateBook from "./books/pages/UpdateBook";
import UserBooks from "./books/pages/UserBooks";

import MainNavigation from "./shared/components/Navigation/MainNavigation";
import Aut from "./users/pages/Aut";
import Users from "./users/pages/Users";
import { AuthContext } from "./shared/context/auth-context";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, [isLoggedIn]);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, [isLoggedIn]);

  let routes;

  if (isLoggedIn) {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/livros/novo" element={<NewBook />} />
          <Route path="/livros/:livroId" element={<UpdateBook />} />
          <Route path="/:userId/livros" element={<UserBooks />} />
        </Routes>
        <Navigate to="/" replace state={isLoggedIn} />
      </>
    );
  } else {
    routes = (
      <>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/aut" element={<Aut />} />
        </Routes>
        <Navigate to="/aut" replace state={isLoggedIn} />
      </>
    );
  }

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
        <BrowserRouter>
          <MainNavigation />
          <main>{routes}</main>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default App;
