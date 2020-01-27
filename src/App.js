import React, { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner/Spinner";
import { Switch, Route, withRouter } from "react-router-dom";
import firebase from "./firebase";
import { connect } from "react-redux";
import {
  login,
  setUserLoading,
  loadTotalServers,
  loadJoinedServers
} from "./Reudux/Actions";
const Auth = lazy(() => import("./Components/Auth/Auth"));
const Discord = lazy(() => import("./Components/Discord/Discord"));

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.props.history.push("/");
        this.props.login(user);
        this.props.loadTotalServers();
        this.props.loadJoinedServers(user.uid, this.addListner);
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
    setLoading: isLoading => dispatch(setUserLoading(isLoading)),
    loadTotalServers: () => dispatch(loadTotalServers()),
    loadJoinedServers: uid => dispatch(loadJoinedServers(uid))
  };
}
function mapStateToProps(state) {
  return {
    isLoading: state.server.isLoading,
    user: state.user.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
