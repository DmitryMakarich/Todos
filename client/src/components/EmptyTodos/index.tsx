import React from "react";

import { BsEmojiSmileUpsideDown } from "react-icons/bs";

import "./index.scss";

export default function EmptyTodos() {
  return (
    <div className="empty-list">
      <BsEmojiSmileUpsideDown />
      <span>No todos matching given criteria</span>
    </div>
  );
}
