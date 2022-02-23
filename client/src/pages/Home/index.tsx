import React, { useState } from "react";
import "./index.scss";

export default function HomePage() {
  const [isAuth, setIsAuth] = useState(true);

  return (
    <section className="home-page">
      <div className="home-page_content">
        <div className="home-page_content_title">Todo List</div>
        {isAuth ? (
          <div className="home-page_content_login-buttons">
            <button >Sign in</button>
            <button>Sign up</button>
          </div>
        ) : (
          <button className="home-page_content_start-button">
            Go to Todos
          </button>
        )}
      </div>
    </section>
  );
}
