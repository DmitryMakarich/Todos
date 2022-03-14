import React, { useEffect, useState } from "react";

import { BsCardChecklist } from "react-icons/bs";

import "./index.scss";
import TodoList from "../../components/TodoList";
import Loader from "../../components/Loader";
import { useHistory } from "react-router-dom";
import CreationForm from "../../components/Modal/Forms/Creation";
import { Pagination } from "@mui/material";
import FilterBlock from "../../components/FilterBlock";
import { useDispatch } from "react-redux";
import { UserActionTypes } from "../../redux/types/user";
import { UseTypeSelector } from "../../hooks/useTypeSelector";
import { getTagAction } from "../../redux/store/action-creators/tag";
import {
  getTodosAction,
  removeTodoAction,
  updateTodoAction,
} from "../../redux/store/action-creators/todo";
import { TodoActionTypes } from "../../redux/types/todo";
import TodoModel from "../../model/Todo";

function TodoPage() {
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const {
    tag: { tags },
    todo,
  } = UseTypeSelector((state) => state);
  const dispatch = useDispatch();

  const { todos, limit, currentPage, isLoading, totalPages, filter } = todo;

  useEffect(() => {
    dispatch(getTagAction());
  }, []);

  useEffect(() => {
    dispatch(getTodosAction(currentPage, limit, filter));
  }, [currentPage, filter]);

  const openModalHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  const updateTodoHandler = (updateTodo: TodoModel) => {
    dispatch(updateTodoAction(updateTodo));
  };

  const deleteTodoHandler = (id: string) => {
    dispatch(removeTodoAction(id));
  };

  const setFilterHandler = (filter: null | boolean) => {
    dispatch({ type: TodoActionTypes.SET_FILTER, payload: filter });
  };

  return (
    <div className="todo-page">
      <header className="todo-page_header">
        <BsCardChecklist className="todo-page_header_logo" />

        <button
          className="todo-page_header_btn"
          onClick={() => {
            dispatch({ type: UserActionTypes.LOGOUT_USER });
            history.push("/");
          }}
        >
          Logout
        </button>
      </header>
      <section className="todo-page_body">
        <h1>Your todo list</h1>
        <button
          className="todo-page_body_create-btn"
          onClick={openModalHandler}
          style={
            !todos.length
              ? {
                  border: "5px solid white",
                  animationDuration: "3s",
                  animationName: "highlights",
                  animationIterationCount: "infinite",
                }
              : {}
          }
        >
          Create todo
        </button>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <FilterBlock
              filterHandler={setFilterHandler}
              filterOption={filter}
            />
            <TodoList
              isEmpty={todos.length === 0}
              todos={todos}
              tags={tags}
              deleteHandler={deleteTodoHandler}
              updateHadler={updateTodoHandler}
            />
            <Pagination
              page={currentPage}
              onChange={(_, value) =>
                dispatch({
                  type: TodoActionTypes.SET_CURRENT_PAGE,
                  payload: value,
                })
              }
              className="todo-page_body_links"
              count={totalPages}
              color="primary"
              hidePrevButton
              hideNextButton
              style={{ color: "white" }}
            />
          </>
        )}
      </section>
      {isOpenModal && (
        <CreationForm
          onCloseHandler={openModalHandler}
          options={tags}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}

export default TodoPage;
