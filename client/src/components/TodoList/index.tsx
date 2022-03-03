import React from "react";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";

import TodoModel from "../../model/Todo";

import "./index.scss";

interface Props {
  todos: Array<TodoModel>;
}

const titles = [
  { label: "#" },
  { label: "Todo Title" },
  { label: "Actions", colSpan: 2 },
];

export default function TodoList({ todos }: Props) {
  return (
    <div className="todo-list">
      <table>
        <thead className="todo-list_head">
          <tr>
            {titles.map((title) => (
              <th key={title.label} colSpan={title.colSpan}>
                {title.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="todo-list_body">
          {todos.map((todo) => (
            <tr
              key={todo._id}
              style={{ background: todo.isCompleted ? "#bdffb8" : "white" }}
            >
              <td>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onChange={(e) => (e.target.checked = !e.target.checked)}
                />
              </td>
              <td>{todo.title}</td>
              <td>
                <BsPencilSquare />
              </td>
              <td>
                <BsTrashFill />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
