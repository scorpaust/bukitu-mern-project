import React, {
  FormEvent,
  FormEventHandler,
  ReactElement,
  useEffect,
  useReducer,
} from "react";
import { validate } from "../../util/validators";
import "./Input.css";

type Props = {
  label: string;
  id: string;
  element: string;
  type?: string;
  placeholder: string;
  rows?: number;
  errorText?: string;
  validators: Array<any>;
  value?: any;
  valid?: boolean;
  onInput: Function;
};

const inputReducer = (state: any, action: any) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      return state;
  }
};

const Input = (props: Props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.value || "",
    isTouched: false,
    isValid: props.valid || false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeInputHandler = (event: FormEvent<HTMLInputElement>) => {
    dispatch({
      type: "CHANGE",
      val: event.currentTarget.value,
      validators: props.validators,
    });
  };

  const touchInputHandler = (
    event: FormEvent<HTMLInputElement> | FormEvent<HTMLTextAreaElement>
  ) => {
    dispatch({
      type: "TOUCH",
    });
  };

  const changeTextareaHandler = (event: FormEvent<HTMLTextAreaElement>) => {
    dispatch({
      type: "CHANGE",
      val: event.currentTarget.value,
      validators: props.validators,
    });
  };

  const element: ReactElement =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeInputHandler}
        onBlur={touchInputHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        placeholder={props.placeholder}
        onChange={changeTextareaHandler}
        onBlur={touchInputHandler}
        value={inputState.value}
      />
    );

  return (
    <div
      className={`form-control ${!inputState.isValid &&
        inputState.isTouched &&
        "form-control--invalid"}`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
