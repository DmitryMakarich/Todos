import { observer } from "mobx-react-lite";
import React, { useState } from "react";
import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import TagModel from "../../model/Tag";

import TodoModel from "../../model/Todo";
import { titles } from "../../utils/TableTitles";
import DeleteForm from "../Modal/Forms/Delete";
import UpdateForm from "../Modal/Forms/Update";

import "./index.scss";

interface Props {
  todos: Array<TodoModel>;
  tags: Array<TagModel>;
  deleteHandler: (id: string) => Promise<string>;
  updateHadler: (todo: TodoModel) => Promise<void>;
}

function TodoList({ todos, tags, deleteHandler, updateHadler }: Props) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [selectedTodo, setSelectedTodo] = useState<TodoModel | null>(null);

  const deleteModalHandler = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  const updateModalHandler = () => {
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

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
                  defaultChecked={todo.isCompleted}
                  onChange={(e) => {
                    updateHadler({
                      ...todo,
                      isCompleted: e.currentTarget.checked,
                    });
                  }}
                />
              </td>
              <td>{todo.title}</td>
              <td>{tags.find((tag) => tag._id === todo.tag)?.title}</td>
              <td>
                <BsPencilSquare
                  onClick={() => {
                    setSelectedTodo(todo);
                    updateModalHandler();
                  }}
                />
              </td>
              <td>
                <BsTrashFill
                  onClick={() => {
                    deleteHandler(todo._id).then((message) => {
                      setDeleteMessage(message);
                      deleteModalHandler();
                    });
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isOpenDeleteModal && (
        <DeleteForm
          onCloseHandler={deleteModalHandler}
          message={deleteMessage}
        />
      )}
      {isOpenUpdateModal && selectedTodo && (
        <UpdateForm
          onCloseHandler={updateModalHandler}
          options={tags}
          updateHandler={updateHadler}
          todo={selectedTodo}
        />
      )}
    </div>
  );
}

export default observer(TodoList);
