import React, { CSSProperties, MouseEventHandler, ReactNode } from "react";
import ReactDOM from "react-dom";
import { CSSTransition } from "react-transition-group";
import Backdrop from "./Backdrop";

import "./Modal.css";

type ModalProps = {
  className?: string;
  style?: CSSProperties | undefined;
  headerClass?: string;
  header?: string;
  onSubmit?: MouseEventHandler<HTMLFormElement>;
  contentClass?: string;
  children?: ReactNode | ReactNode[];
  footerClass?: string;
  footer?: ReactNode | ReactNode[];
  show: boolean;
  onCancel: MouseEventHandler<HTMLElement>;
};

const ModalOverlay = (props: ModalProps) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );

  return ReactDOM.createPortal(
    content,
    document.getElementById("modal-hook") as HTMLDivElement
  );
};

const Modal = (props: ModalProps) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        timeout={200}
        mountOnEnter
        unmountOnExit
        classNames="modal"
      >
        {<ModalOverlay {...props} />}
      </CSSTransition>
    </>
  );
};

export default Modal;
