import React from "react";
import "./App.css";
import { Route, withRouter, Switch } from "react-router-dom";
import routes from "./routes";

function App(props) {
  return (
    <Switch>
      {routes.map((route) => (
        <Route key={route.id} {...route} />
      ))}
    </Switch>
  );
}

export default withRouter(App);
