import React from "react";
import { BsCardChecklist } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { logoutUserAction } from "../../redux/user/user.actions";

import "./index.scss";

export default function Header() {
  const history = useHistory();
  const dispatch = useDispatch();

  return (
    <header className="header">
      <BsCardChecklist
        className="header_logo"
        onClick={() => history.push("/")}
      />

      <button
        className="header_btn"
        onClick={() => {
          dispatch(logoutUserAction());
          history.push("/");
        }}
      >
        Logout
      </button>
    </header>
  );
}
