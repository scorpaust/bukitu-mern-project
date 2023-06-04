import Input from "../../shared/components/FormElements/Input";
import {
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import "./BookForm.css";
import Button from "../../shared/components/FormElements/Button";
import { useForm } from "../../shared/hooks/form-hook";

const NewBook = () => {
  const [formState, inputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const bookSubmitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(formState.inputs);
  };

  return (
    <form className="book-form" onSubmit={bookSubmitHandler}>
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
      <Button type="submit" disabled={!formState.isValid}>
        Adicionar Livro
      </Button>
    </form>
  );
};

export default NewBook;
