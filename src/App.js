import React, { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner/Spinner";
import { Switch, Route, withRouter } from "react-router-dom";
import firebase from "./firebase";
import { connect } from "react-redux";
import { login, setLoading } from "./Reudux/Actions";
const Auth = lazy(() => import("./Components/Auth/Auth"));
const Discord = lazy(() => import("./Components/Discord/Discord"));

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push("/");
        this.props.login(user);
      } else {
        this.props.history.replace("/login");
        this.props.setLoading(false);
      }
    });
  }
  render() {
    if (this.props.isLoading) return <Spinner />;
    else
      return (
        <Switch>
          <Route path="/(login|register)">
            <Suspense fallback={<Spinner />}>
              <Auth />
            </Suspense>
          </Route>
          <Route path="/">
            <Suspense fallback={<Spinner />}>
              <Discord />
            </Suspense>
          </Route>
        </Switch>
      );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    login: user => dispatch(login(user)),
    setLoading: isLoading => dispatch(setLoading(isLoading))
  };
}
function mapStateToProps(state) {
  return {
    isLoading: state.isLoading
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
