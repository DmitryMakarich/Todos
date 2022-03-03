import React, { useEffect } from "react";

import { BsCardChecklist } from "react-icons/bs";
import { observer } from "mobx-react-lite";
import { useStore } from "../../store";

import "./index.scss";
import TodoList from "../../components/TodoList";
import Loader from "../../components/Loader";
import { useHistory } from "react-router-dom";

function TodoPage() {
  const history = useHistory();
  const { userStore, todoStore } = useStore();

  useEffect(() => {
    setTimeout(() => {
      todoStore.init();
    }, 1000);
  }, []);

  return (
    <div className="todo-page">
      <header className="todo-page_header">
        <BsCardChecklist className="todo-page_header_logo" />
        <button
          className="todo-page_header_button"
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
        {todoStore.isLoading ? (
          <Loader />
        ) : (
          <TodoList todos={todoStore.todos} />
        )}
      </section>
    </div>
  );
}

export default observer(TodoPage);
