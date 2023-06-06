import React, { useState } from "react";
import Card from "../../shared/components/UIElements/Card";
import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import "./Aut.css";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validators";
import { useForm } from "../../shared/hooks/form-hook";

const Aut = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const authSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();

    console.log(formState.inputs);
  };

  const switchModeHandler = () => {
    if (!isLoginMode) {
      setFormData(
        { name: undefined },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          ...formState.inputs,
        },
        false
      );
    }
    setIsLoginMode((prevMode) => !prevMode);
  };

  return (
    <Card className="authentication">
      <h2>Autenticação</h2>

      <hr />
      <form>
        {!isLoginMode && (
          <Input
            element="input"
            id="name"
            type="name"
            label="Nome"
            errorText="Por favor, insira um nome válido."
            placeholder="O seu nome..."
            onInput={inputHandler}
            validators={[VALIDATOR_REQUIRE()]}
          />
        )}
        <Input
          element="input"
          id="email"
          type="email"
          label="Endereço eletrónico"
          errorText="Por favor, insira um endereço eletrónico válido."
          placeholder="Endereço eletrónico..."
          onInput={inputHandler}
          validators={[VALIDATOR_EMAIL()]}
        />
        <Input
          element="input"
          id="password"
          type="password"
          label="Senha"
          errorText="Por favor, insira uma senha válida com, pelo menos, 5 caracteres."
          placeholder="Senha..."
          onInput={inputHandler}
          validators={[VALIDATOR_MINLENGTH(5)]}
        />
        <Button type="submit" disabled={!formState.isValid}>
          {isLoginMode ? "Entrar" : "Registar"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        Mudar para {isLoginMode ? "Registar" : "Entrar"}
      </Button>
    </Card>
  );
};

export default Aut;
