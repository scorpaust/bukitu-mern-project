import React, { useContext, useState } from "react";
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
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const Aut = () => {
  const auth = useContext(AuthContext);

  const [isLoginMode, setIsLoginMode] = useState(true);

  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

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

  const authSubmitHandler = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (isLoginMode) {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/utilizadores/entrar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        auth.login();
      } catch (err) {
        if (err instanceof Error) {
          setIsLoading(false);
          setError(
            err.message || "Algo correu errado. Tente, de novo, mais tarde."
          );
        }
      }
    } else {
      try {
        setIsLoading(true);
        const response = await fetch(
          "http://localhost:5000/api/utilizadores/registar",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              name: formState.inputs.name.value,
              email: formState.inputs.email.value,
              password: formState.inputs.password.value,
            }),
          }
        );

        const responseData = await response.json();

        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setIsLoading(false);
        auth.login();
      } catch (err) {
        if (err instanceof Error) {
          setIsLoading(false);
          setError(
            err.message || "Algo correu errado. Tente, de novo, mais tarde."
          );
        }
      }
    }
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

  const errorHandler = () => {
    setError("");
  };

  return (
    <>
      <ErrorModal error={error} onClear={errorHandler} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <h2>Autenticação</h2>

        <hr />
        <form onSubmit={authSubmitHandler}>
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
    </>
  );
};

export default Aut;
