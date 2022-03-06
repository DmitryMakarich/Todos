import React from "react";
import Modal from "../..";

interface Props {
  onCloseHandler: Function;
  message: string;
}

export default function DeleteForm({ onCloseHandler, message }: Props) {
  return (
    <Modal onCloseHandler={onCloseHandler}>
      <div className="form">
        <h2>Delete</h2>
        <p>{message}</p>
      </div>
    </Modal>
  );
}
