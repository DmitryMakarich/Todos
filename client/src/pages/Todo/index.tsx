import React, { useEffect, useState } from "react";

import { BsCardChecklist } from "react-icons/bs";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

import "./index.scss";
import TodoList from "../../components/TodoList";
import Loader from "../../components/Loader";
import { useHistory } from "react-router-dom";
import CreationForm from "../../components/Modal/Forms/Creation";

function TodoPage() {
  const history = useHistory();
  const { userStore, todoStore, tagStore } = useStore();

  const { createTodo, deleteTodo, updateTodo } = todoStore;

  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModalHandler = () => {
    setIsOpenModal(!isOpenModal);
  };

  useEffect(() => {
    todoStore.init();
    tagStore.init();

    return () => {
      todoStore.dispose();
      tagStore.dispose();
    };
  }, [todoStore, tagStore]);

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
        <h1>Yout todo list</h1>
        <button
          className="todo-page_body_create-btn"
          onClick={openModalHandler}
        >
          Create todo
        </button>
        {todoStore.isLoading ? (
          <Loader />
        ) : (
          <TodoList
            todos={todoStore.todos}
            tags={tagStore.tags}
            deleteHandler={deleteTodo.bind(todoStore)}
            updateHadler={updateTodo.bind(todoStore)}
          />
        )}
      </section>
      {isOpenModal && (
        <CreationForm
          onCloseHandler={openModalHandler}
          createHandler={createTodo.bind(todoStore)}
          options={tagStore.tags}
        />
      )}
    </div>
  );
}

export default observer(TodoPage);
