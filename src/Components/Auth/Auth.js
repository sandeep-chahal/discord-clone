import React from "react";
import Login from "./Login";
import Register from "./Register";
import { Route, Switch } from "react-router-dom";
import "./Auth.style.scss";

const Auth = () => (
  <div className="auth">
    <Switch>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/register">
        <Register />
      </Route>
      {/* in case if nothing renders and user is not logged in */}
      <Route path="/*">
        <Login />
      </Route>
    </Switch>
  </div>
);

export default Auth;
