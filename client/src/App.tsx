import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import AdminPage from "./pages/Admin";
import HomePage from "./pages/Home";
import TodoPage from "./pages/Todo";

import "./Styles/main.scss";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <div className="main-container">
        <Header />
        <PrivateRoute path="/todo" exact component={TodoPage} />
        <PrivateRoute path="/admin" exact component={AdminPage} />
      </div>
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
