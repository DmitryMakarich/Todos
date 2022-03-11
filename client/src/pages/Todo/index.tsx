import React, { useEffect, useState } from "react";

import { BsCardChecklist } from "react-icons/bs";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

import "./index.scss";
import TodoList from "../../components/TodoList";
import Loader from "../../components/Loader";
import { useHistory } from "react-router-dom";
import CreationForm from "../../components/Modal/Forms/Creation";
import { Pagination } from "@mui/material";
import FilterBlock from "../../components/FilterBlock";

function TodoPage() {
  const history = useHistory();
  const { userStore, todoStore, tagStore } = useStore();

  const { createTodo, deleteTodo, updateTodo, currentPage, getTodos } =
    todoStore;

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModalHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    todoStore.getTodos(todoStore.filter);

    return () => {
      todoStore.dispose();
    };
  }, [todoStore, currentPage]);

  useEffect(() => {
    tagStore.init();

    return () => {
      tagStore.dispose();
    };
  }, [tagStore]);

  return (
    <div className="todo-page">
      <header className="todo-page_header">
        <BsCardChecklist className="todo-page_header_logo" />
        <button
          className="todo-page_header_btn"
          onClick={() => {
            userStore.logout();
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
            !todoStore.todos.length
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
        {todoStore.isLoading ? (
          <Loader />
        ) : (
          <>
            <FilterBlock
              filterHandler={getTodos.bind(todoStore)}
              filterOption={todoStore.filter}
            />
            <TodoList
              isEmpty={todoStore.isEmptyTodos()}
              todos={todoStore.todos}
              tags={tagStore.tags}
              deleteHandler={deleteTodo.bind(todoStore)}
              updateHadler={updateTodo.bind(todoStore)}
            />
            <Pagination
              page={todoStore.currentPage}
              onChange={(_, value) => todoStore.setCurrentPage(value)}
              className="todo-page_body_links"
              count={todoStore.totalPages}
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
          createHandler={createTodo.bind(todoStore)}
          options={tagStore.tags}
          isLoading={todoStore.isLoading}
        />
      )}
    </div>
  );
}

export default observer(TodoPage);
