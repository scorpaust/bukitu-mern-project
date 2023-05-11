import React, { useCallback } from "react";
import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./NewBook.css";

const NewBook = () => {
  const titleInputHandler = useCallback(
    (id: string, value: any, isValid: boolean) => {},
    []
  );

  const descriptionInputHandler = useCallback(
    (id: string, value: any, isValid: boolean) => {},
    []
  );

  return (
    <form className="book-form">
      <Input
        id="title"
        placeholder="Título do livro"
        element="input"
        type="text"
        label="Título"
        errorText="Por favor, insira um título válido."
        validators={[VALIDATOR_REQUIRE()]}
        onInput={titleInputHandler}
      />
      <Input
        id="description"
        placeholder="Descrição do livro"
        element="textarea"
        type="text"
        label="Descrição"
        errorText="Por favor, insira uma descrição válida (mínimo de 5 caracteres)."
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={descriptionInputHandler}
      />
    </form>
  );
};

export default NewBook;
