import React, { SetStateAction, useCallback, useEffect, useState } from 'react';
import {
  BrowserRouter,
  Route,
  Routes,
  redirect,
  Navigate,
  useLocation,
  matchRoutes,
  Location,
  useNavigate
} from 'react-router-dom';
import './App.css';
import NewBook from './books/pages/NewBook';
import UpdateBook from './books/pages/UpdateBook';
import UserBooks from './books/pages/UserBooks';

import MainNavigation from './shared/components/Navigation/MainNavigation';
import Aut from './users/pages/Aut';
import Users from './users/pages/Users';
import { AuthContext } from './shared/context/auth-context';
import { ReadableByteStreamController } from 'stream/web';
import { useAuth } from './shared/hooks/auth-hook';

const App = () => {
  let routes;

  const { token, login, logout, userId } = useAuth();

  if (token || JSON.parse(localStorage.getItem('userData') as string)) {
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
        <Navigate to="/aut" replace={true} />
      </React.Fragment>
    );
  }

  return (
    <React.Fragment>
      <AuthContext.Provider
        value={{
          isLoggedIn: !!token,
          token: token,
          userId: userId,
          login,
          logout
        }}
      >
        <BrowserRouter>
          <MainNavigation />
          <main>{routes}</main>
        </BrowserRouter>
      </AuthContext.Provider>
    </React.Fragment>
  );
};

export default App;
