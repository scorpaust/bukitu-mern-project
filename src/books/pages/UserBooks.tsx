import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { Book } from "../../types/Book";
import BookList from "../components/BookList";

const UserBooks = () => {
  const userId = useParams().userId;
  const [loadedBooks, setLoadedBooks] = useState([]);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const fetchBooks = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/livros/utilizador/${userId}`
      );
      console.log(responseData);

      if (responseData) setLoadedBooks(responseData.books);
    } catch (err) {}
  };

  useEffect(() => {
    fetchBooks();
  }, [sendRequest, userId]);

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && loadedBooks.length > 0 && <BookList items={loadedBooks} />}
    </React.Fragment>
  );
};

export default UserBooks;
