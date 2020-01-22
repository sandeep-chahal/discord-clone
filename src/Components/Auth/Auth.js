import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from "./Login";
import Register from "./Register";
import { Route, Switch } from "react-router-dom";
import "./Auth.style.scss";
import { css } from "styled-components";

const Auth = props => (
  <div className="auth">
    <TransitionGroup>
      <CSSTransition in appear timeout={600} classNames="fade">
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
      </CSSTransition>
    </TransitionGroup>
  </div>
);

export default Auth;
