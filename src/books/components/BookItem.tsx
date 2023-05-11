import React, { CSSProperties, useEffect, useRef, useState } from "react";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import { Book } from "../../types/Book";
import "./BookItem.css";

type Props = {
  item: Book;
};

const BookItem = (props: Props) => {
  const [showBook, setShowBook] = useState(false);

  return (
    <>
      <li className="book-item">
        <Card className="book-item__content">
          <div className="book-item__image">
            <img src={props.item.image} alt={props.item.title} />
          </div>
          <div className="book-item__info">
            <h2>{props.item.title}</h2>
            <h3>{props.item.summary}</h3>
            <p>{props.item.author}</p>
          </div>
          <div className="book-item__actions">
            <Button to={`/livros/remover`}>Comprar</Button>
            <Button danger to={`/livros/remover`}>
              Remover
            </Button>
          </div>
        </Card>
      </li>
    </>
  );
};

export default BookItem;
