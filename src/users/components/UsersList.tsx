import React from "react";
import "./UsersList.css";
import UserItem from "./UserItem";
import { User } from "../../types/User";
import Card from "../../shared/components/UIElements/Card";

export type Props = {
  users: User[];
};

const UsersList = ({ users }: Props) => {
  if (users.length === 0) {
    return (
      <Card>
        <div className="center">Sem utilizadores.</div>
      </Card>
    );
  }

  return (
    <ul className="users-list">
      {users.map((user) => {
        return (
          <UserItem
            key={user.id}
            id={user.id}
            image={user.image}
            name={user.name}
            booksCount={user.books.length}
          />
        );
      })}
    </ul>
  );
};

export default UsersList;
