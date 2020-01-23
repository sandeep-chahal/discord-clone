import React from "react";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import Login from "./Login";
import Register from "./Register";
import { Route, Switch } from "react-router-dom";
import { withRouter } from "react-router";
import "./Auth.style.scss";

const Auth = ({ location }) => (
  <div className="auth">
    <div className="wrapper">
      <TransitionGroup>
        <CSSTransition key={location.key} timeout={500} classNames="alert">
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
  </div>
);

export default withRouter(Auth);
