import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import HomePage from "./pages/Home";
import TodoPage from "./pages/Todo";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={HomePage} />
      <PrivateRoute path="/todo" exact component={TodoPage} />
      <Redirect to="/" />
    </Switch>
  );
}

export default App;
