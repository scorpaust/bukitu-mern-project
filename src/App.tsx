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

  const [userId, setUserId] = useState("");

  const login = useCallback(
    (uid: any) => {
      setIsLoggedIn(true);
      setUserId(uid);
    },
    [isLoggedIn]
  );

  const logout = useCallback(() => {
    setIsLoggedIn(false);
    setUserId("");
  }, [isLoggedIn]);

  let routes;

  if (isLoggedIn) {
    routes = (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/livros/novo" element={<NewBook />} />
          <Route path="/livros/:lid" element={<UpdateBook />} />
          <Route path="/:userId/livros" element={<UserBooks />} />
        </Routes>
      </React.Fragment>
    );
  } else {
    routes = (
      <React.Fragment>
        <Routes>
          <Route path="/" element={<Users />} />
          <Route path="/aut" element={<Aut />} />
        </Routes>
      </React.Fragment>
    );
  }

  return (
    <>
      <AuthContext.Provider
        value={{ isLoggedIn, userId: userId, login, logout }}
      >
        <BrowserRouter>
          <MainNavigation />
          <main>{routes}</main>
        </BrowserRouter>
      </AuthContext.Provider>
    </>
  );
};

export default App;
