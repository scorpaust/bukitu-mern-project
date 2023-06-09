import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";
import { AuthContext } from "../../context/auth-context";

const NavLinks = () => {
  const auth = useContext(AuthContext);

  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">Todos os Utilizadores</NavLink>
      </li>
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/u1/livros">Os Meus Livros</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <NavLink to="/livros/novo">Novo Livro</NavLink>
        </li>
      )}
      {!auth.isLoggedIn && (
        <li>
          <NavLink to="/aut">Autenticar</NavLink>
        </li>
      )}
      {auth.isLoggedIn && (
        <li>
          <button onClick={auth.logout}>Sair</button>
        </li>
      )}
    </ul>
  );
};

export default NavLinks;
