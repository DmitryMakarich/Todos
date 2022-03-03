import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useStore } from "../../store";
import LoginForm from "../../components/Modal/AuthorizationForms/LoginForm";
import RegisterForm from "../../components/Modal/AuthorizationForms/RegisterForm";
import "./index.scss";
import { observer } from "mobx-react-lite";

function HomePage() {
  const { userStore, todoStore } = useStore();

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const history = useHistory();

  const closeLoginModalHandler = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };

  const closeRegisterModalHandler = () => {
    setIsOpenRegisterModal(!isOpenRegisterModal);
  };

  return (
    <section className="home-page">
      <div className="home-page_content">
        <div className="home-page_content_title">Todo List</div>
        {userStore.isLogging ? (
          <button
            onClick={() =>
              history.push("/todo", { userName: userStore.user?.userName })
            }
            className="home-page_content_start-button"
          >
            Go to Todos
          </button>
        ) : (
          <div className="home-page_content_login-buttons">
            <button onClick={closeLoginModalHandler}>Sign in</button>
            <button onClick={closeRegisterModalHandler}>Sign up</button>
          </div>
        )}
      </div>
      {isOpenLoginModal && (
        <LoginForm onCloseHandler={closeLoginModalHandler} />
      )}
      {isOpenRegisterModal && (
        <RegisterForm onCloseHandler={closeRegisterModalHandler} />
      )}
    </section>
  );
}

export default observer(HomePage);
