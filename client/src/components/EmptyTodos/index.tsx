import React from "react";

import { BsEmojiSmileUpsideDown } from "react-icons/bs";

import "./index.scss";

export default function EmptyTodos() {
  return (
    <div className="empty-list">
      <BsEmojiSmileUpsideDown />
      <span>Ooooops, your todo list is empty, let's create first todo</span>
    </div>
  );
}
