import React from "react";
import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink to="/">Todos os Utilizadores</NavLink>
      </li>
      <li>
        <NavLink to="/u1/livros">Os Meus Livros</NavLink>
      </li>
      <li>
        <NavLink to="/livros/novo">Novo Livro</NavLink>
      </li>
      <li>
        <NavLink to="/aut">Autenticar</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
