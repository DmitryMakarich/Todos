import React, { useState } from "react";
import { observer } from "mobx-react-lite";

import { BsTrashFill } from "react-icons/bs";
import { BsPencilSquare } from "react-icons/bs";
import { BsFillExclamationCircleFill } from "react-icons/bs";

import TagModel from "../../model/Tag";

import TodoModel from "../../model/Todo";
import { titles } from "../../utils/TableTitles";
import DeleteForm from "../Modal/Forms/Delete";
import UpdateForm from "../Modal/Forms/Update";

import { StyledTooltip } from "../Tooltip";
import EmptyTodos from "../EmptyTodos";
import CustomSnackBar from "../SnackBar";

import "./index.scss";

interface Props {
  isEmpty: boolean;
  todos: Array<TodoModel>;
  tags: Array<TagModel>;
  deleteHandler: (id: string) => Promise<string>;
  updateHadler: (todo: TodoModel) => Promise<void>;
}

function TodoList({
  isEmpty,
  todos,
  tags,
  deleteHandler,
  updateHadler,
}: Props) {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState<TodoModel | null>(null);
  const [isOpenSnackBar, setIsOpenSnackBar] = useState(false);
  const [isSuccessfullyDeleted, setIsSuccessfullyDeleted] = useState<
    boolean | null
  >(null);

  const deleteModalHandler = () => {
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  const updateModalHandler = () => {
    setIsOpenUpdateModal(!isOpenUpdateModal);
  };

  const snackBarHandler = () => {
    setIsOpenSnackBar(!isOpenSnackBar);
  };

  const deleteActionHander = (result: boolean) => {
    setIsSuccessfullyDeleted(result);
  };

  return (
    <>
      {!isEmpty ? (
        <>
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
                    style={{
                      background: todo.isCompleted ? "#bdffb8" : "white",
                    }}
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
                    <td>
                      <span>{todo.title}</span>
                      {todo.title.length > 20 && (
                        <StyledTooltip title={todo.title} arrow placement="top">
                          <div className="tooltip_trigger">
                            <BsFillExclamationCircleFill />
                          </div>
                        </StyledTooltip>
                      )}
                    </td>
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
                          setSelectedTodo(todo);
                          deleteModalHandler();
                        }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isOpenDeleteModal && selectedTodo && (
              <DeleteForm
                onCloseHandler={deleteModalHandler}
                id={selectedTodo._id}
                deleteHandler={deleteHandler}
                snackBarHandler={snackBarHandler}
                actionHandler={deleteActionHander}
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
        </>
      ) : (
        <EmptyTodos />
      )}
      <CustomSnackBar
        isOpenSnackBar={isOpenSnackBar}
        isSuccessfully={isSuccessfullyDeleted}
        successMessage={"Todo was deleted"}
        deniedMessage={"Todo was denied"}
        snackBarHandler={snackBarHandler}
      />
    </>
  );
}

export default observer(TodoList);
