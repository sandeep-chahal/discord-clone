import React, { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner/Spinner";
import { Switch, Route, Redirect } from "react-router-dom";
import { withRouter } from "react-router";
import firebase from "./firebase";
const Auth = lazy(() => import("./Components/Auth/Auth"));
const Main = lazy(() => import("./Components/Main/Main"));

class App extends React.Component {
  state = { logged: false };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("gg");
        this.setState({ logged: true });
      } else {
        this.props.history.replace("/login");
      }
    });
  }
  render() {
    // if (!this.props.logged) {
    //   this.props.history.replace("/login");
    // }
    return (
      <Switch>
        <Route path="/login">
          <Suspense fallback={<Spinner />}>
            <Auth />
          </Suspense>
        </Route>
        <Route path="/register">
          <Suspense fallback={<Spinner />}>
            <Auth />
          </Suspense>
        </Route>
        <Route path="/">
          <Suspense fallback={<Spinner />}>
            <Main />
          </Suspense>
        </Route>
      </Switch>
    );
  }
}

export default withRouter(App);
