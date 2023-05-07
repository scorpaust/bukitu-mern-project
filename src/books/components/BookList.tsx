import React from "react";
import Card from "../../shared/components/UIElements/Card";
import { Book } from "../../types/Book";
import BookItem from "./BookItem";
import "./BookList.css";

type Props = {
  items: Book[];
};

const BookList = (props: Props) => {
  if (props.items.length === 0) {
    return (
      <div className="book-list center">
        <Card>
          <h2>Nenhum livro encontrado.</h2>
          <button>Adiciona um à estante!</button>
        </Card>
      </div>
    );
  }

  return (
    <ul className="book-list">
      {props.items.map((book) => (
        <BookItem item={book} />
      ))}
    </ul>
  );
};

export default BookList;
