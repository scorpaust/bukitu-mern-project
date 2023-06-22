import Input from '../../shared/components/FormElements/Input';
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE
} from '../../shared/util/validators';
import './BookForm.css';
import Button from '../../shared/components/FormElements/Button';
import { useForm } from '../../shared/hooks/form-hook';
import React, { useContext } from 'react';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import ImageUpload from '../../shared/components/FormElements/ImageUpload';

const NewBook = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler] = useForm(
    {
      title: {
        value: '',
        isValid: false
      },
      description: {
        value: '',
        isValid: false
      },
      authors: {
        value: '',
        isValid: false
      },
      image: {
        value: null,
        isValid: false
      }
    },
    false
  );

  const navigate = useNavigate();

  const bookSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const formData = new FormData();

      formData.append('title', formState.inputs.title.value);

      formData.append('summary', formState.inputs.description.value);

      formData.append('image', formState.inputs.image.value);

      formData.append('authors', formState.inputs.authors.value);

      formData.append('userId', auth.userId);

      await sendRequest('http://localhost:5000/api/livros', 'POST', formData);

      navigate('/', {
        replace: true
      });
    } catch (err) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      <form className="book-form" onSubmit={bookSubmitHandler}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          placeholder="Título do livro"
          element="input"
          type="text"
          label="Título"
          errorText="Por favor, insira um título válido."
          validators={[VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="description"
          placeholder="Descrição do livro"
          element="textarea"
          label="Descrição"
          errorText="Por favor, insira uma descrição válida (mínimo de 5 caracteres)."
          validators={[VALIDATOR_MINLENGTH(5)]}
          onInput={inputHandler}
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
        />
        <ImageUpload
          id="image"
          onInput={inputHandler}
          center={false}
          errorText="Por favor, carregue uma imagem de capa para o livro."
        />
        <Button type="submit" disabled={!formState.isValid}>
          Adicionar Livro
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewBook;
