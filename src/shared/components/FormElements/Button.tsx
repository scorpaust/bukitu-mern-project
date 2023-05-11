import React, { MouseEventHandler, ReactNode } from "react";
import { Link } from "react-router-dom";

import "./Button.css";

type Props = {
  href?: string;
  size?: number;
  inverse?: boolean;
  danger?: boolean;
  info?: boolean;
  to?: string;
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler<HTMLElement>;
  disabled?: boolean;
  children: ReactNode | ReactNode[];
};

const Button = (props: Props) => {
  if (props.href) {
    return (
      <a
        className={`button button--${props.size || "default"} ${props.inverse &&
          "button--inverse"} ${props.danger && "button--danger"} ${props.info &&
          "button--info"}`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        to={props.to}
        className={`button button--${props.size || "default"} ${props.inverse &&
          "button--inverse"} ${props.danger && "button--danger"} ${props.info &&
          "button--info"}`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`button button--${props.size || "default"} ${props.inverse &&
        "button--inverse"} ${props.danger && "button--danger"} ${props.info &&
        "button--info"}`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
