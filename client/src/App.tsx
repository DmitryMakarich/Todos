import React from "react";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import HomePage from "./pages/Home";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/login" component={LoginPage} />
    </Switch>
  );
}

export default App;
