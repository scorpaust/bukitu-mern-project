import React from "react";
import { Link } from "react-router-dom";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import "./UserItem.css";

export type Props = {
  id: string;
  image: string;
  name: string;
  booksCount: number;
};

const UserItem = ({ id, image, name, booksCount }: Props) => {
  return (
    <li>
      <div className="user-item">
        <Card className="user-item__content">
          <Link to={`/${id}/livros`}>
            <div className="user-item__image">
              <Avatar image={image} alt={name} />
            </div>
            <div className="user-item__info">
              <h2>{name}</h2>
              <h3>
                {booksCount} {booksCount === 1 ? " Livro" : " Livros"}
              </h3>
            </div>
          </Link>
        </Card>
      </div>
    </li>
  );
};

export default UserItem;
