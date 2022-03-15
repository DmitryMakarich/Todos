import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BsCardChecklist } from "react-icons/bs";
import { Pagination } from "@mui/material";

import "./index.scss";
import TodoList from "../../components/TodoList";
import Loader from "../../components/Loader";
import { useHistory } from "react-router-dom";
import CreationForm from "../../components/Modal/Forms/Creation";

import FilterBlock from "../../components/FilterBlock";
import TodoModel from "../../model/Todo";
import { getTagAction } from "../../redux/tag/tag.actions";
import {
  getTodosAction,
  removeTodoAction,
  SetCurrentPage,
  setFilter,
  updateTodoAction,
} from "../../redux/todo/todo.actions";
import { getTodosData } from "../../redux/todo/todo.selectors";
import { getTags } from "../../redux/tag/tag.selectors";
import { logoutUserAction } from "../../redux/user/user.actions";
import { LIMIT_COUNT } from "../../constants/todo.constants";
import { FilterOptions } from "../../utils/FilterOptions";

function TodoPage() {
  const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const { todos, currentPage, isLoading, totalPages, filter } =
    useSelector(getTodosData);

  const { tags } = useSelector(getTags);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTagAction());
  }, []);

  useEffect(() => {
    dispatch(getTodosAction(currentPage, LIMIT_COUNT, filter));
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

  const setFilterHandler = (filter: FilterOptions) => {
    dispatch(setFilter(filter));
  };

  return (
    <div className="todo-page">
      <header className="todo-page_header">
        <BsCardChecklist className="todo-page_header_logo" />

        <button
          className="todo-page_header_btn"
          onClick={() => {
            dispatch(logoutUserAction());
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
                dispatch(SetCurrentPage(value))
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
