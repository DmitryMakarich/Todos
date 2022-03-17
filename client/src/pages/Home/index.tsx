import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import LoginForm from "../../components/Modal/Forms/Login";
import RegisterForm from "../../components/Modal/Forms/Register";
import "./index.scss";
import { loggingInfo } from "../../redux/user/user.selectors";

function HomePage() {
  const { isLogging } = useSelector(loggingInfo);

  const [isOpenLoginModal, setIsOpenLoginModal] = useState(false);
  const [isOpenRegisterModal, setIsOpenRegisterModal] = useState(false);
  const history = useHistory();

  const closeLoginModalHandler = () => {
    setIsOpenLoginModal(!isOpenLoginModal);
  };

  const closeRegisterModalHandler = () => {
    setIsOpenRegisterModal(!isOpenRegisterModal);
  };
  
  const token = window.localStorage.getItem("accessToken");

  return (
    <section className="home-page">
      <div className="home-page_content">
        <div className="home-page_content_title">Todo List</div>
        {isLogging || token ? (
          <button
            onClick={() => history.push("/todo")}
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

export default HomePage;
