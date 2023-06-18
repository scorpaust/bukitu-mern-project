import React, {
  FormEventHandler,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/util/validators";
import "./BookForm.css";

const UpdateBook = () => {
  const bookId = useParams().lid;

  const navigate = useNavigate();

  const auth = useContext(AuthContext);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [loadedBook, setLoadedBook]: any = useState(undefined);

  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      authors: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const fetchBook = async () => {
    try {
      const responseData = await sendRequest(
        `http://localhost:5000/api/livros/${bookId}`
      );
      setLoadedBook(responseData.book);

      setFormData(
        {
          title: {
            value: loadedBook != undefined ? loadedBook.title : "",
            isValid: true,
          },
          description: {
            value: loadedBook != undefined ? loadedBook.summary : "",
            isValid: true,
          },
          authors: {
            value: loadedBook != undefined ? loadedBook.authors : "",
            isValid: true,
          },
        },
        true
      );
    } catch (err) {}
  };

  useEffect(() => {
    fetchBook();
  }, [sendRequest, bookId]);

  if (loadedBook || error) {
    const bookUpdateSubmitHandler = async (event: React.SyntheticEvent) => {
      event.preventDefault();
      try {
        await sendRequest(
          `http://localhost:5000/api/livros/${bookId}`,
          "PATCH",
          JSON.stringify({
            title: formState.inputs.title.value,
            summary: formState.inputs.summary.value,
            authors: formState.inputs.authors.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
      } catch (err) {}
      navigate(`/${auth.userId}/livros`, {
        replace: true,
      });
    };

    if (isLoading) {
      return (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      );
    }

    return (
      <React.Fragment>
        <ErrorModal error={error} onClear={clearError} />
        {!isLoading && loadedBook && (
          <form className="book-form" onSubmit={bookUpdateSubmitHandler}>
            <Input
              id="title"
              element="input"
              placeholder="Título do livro..."
              type="text"
              label="Título"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Por favor, insira um título válido."
              onInput={inputHandler}
              value={loadedBook.title}
              valid={true}
            />
            <Input
              id="summary"
              element="textarea"
              placeholder="Descrição do livro..."
              type="text"
              label="Descrição"
              validators={[VALIDATOR_MINLENGTH(5)]}
              errorText="Por favor, insira um título válido."
              onInput={inputHandler}
              value={loadedBook.summary}
              valid={true}
            />
            <Input
              id="authors"
              placeholder="Autores do livro"
              element="input"
              type="text"
              label="Autores"
              errorText="Por favor, insira os nomes dos autores do livro."
              validators={[VALIDATOR_REQUIRE()]}
              onInput={inputHandler}
              value={loadedBook.authors}
              valid={true}
            />
            <Button type="submit" disabled={!formState.isValid}>
              Atualizar Livro
            </Button>
          </form>
        )}
      </React.Fragment>
    );
  } else {
    return (
      <div className="center">
        <h2>Livro inexistente!</h2>
      </div>
    );
  }
};

export default UpdateBook;
