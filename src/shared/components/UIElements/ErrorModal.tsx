import React, { MouseEventHandler } from "react";

import Modal from "./Modal";
import Button from "../FormElements/Button";

type Props = {
  onClear: MouseEventHandler<HTMLElement>;
  error: String;
};

const ErrorModal = (props: Props) => {
  return (
    <Modal
      onCancel={props.onClear}
      header="Erro"
      show={props.error != ""}
      footer={<Button onClick={props.onClear}>Ok</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
