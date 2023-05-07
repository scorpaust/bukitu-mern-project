import React from "react";
import UsersList from "../components/UsersList";

const Users = () => {
  const users = [
    {
      id: "u1",
      name: "Dinis Costa",
      image:
        "https://avatars.githubusercontent.com/u/61733414?s=400&u=263222f6ae1f7625135f3791b9a37679dacb08b6&v=4",
      booksCount: 5,
      books: [],
    },
  ];

  return <UsersList users={users} />;
};

export default Users;
