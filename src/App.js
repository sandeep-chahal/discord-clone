import React, { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner/Spinner";
import { Switch, Route, withRouter } from "react-router-dom";
import firebase from "./firebase";
import { connect } from "react-redux";
import {
  login,
  setServerLoading,
  loadTotalServers,
  updateServer,
  removeServer
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
        this.addListnerToUser(user.uid);
      } else {
        this.props.history.replace("/login");
        this.props.setLoading(false);
      }
    });
  }

  addListnerToUser = uid => {
    firebase
      .database()
      .ref("users")
      .child(uid)
      .on("value", snap => {
        const userData = snap.val();
        this.fetchServers(userData.servers);
      });
  };

  fetchServers = servers => {
    const keys = Object.keys(servers);
    for (let i = 0; i < keys.length; i++) {
      firebase
        .database()
        .ref("servers/")
        .child(keys[i])
        .on("value", snap => {
          if (snap.val()) this.props.updateServer(keys[i], snap.val());
          else this.removeDeletedServer(keys[i], this.props.user.uid);
        });
    }
    this.props.setLoading(false);
  };
  removeDeletedServer = (id, uid) => {
    //remove from state
    this.props.removeServer(id);
    //remove from db
    firebase
      .database()
      .ref("users/" + uid + "/servers/")
      .child(id)
      .remove();
  };

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
    setLoading: isLoading => dispatch(setServerLoading(isLoading)),
    loadTotalServers: () => dispatch(loadTotalServers()),
    updateServer: (id, server) => dispatch(updateServer(id, server)),
    removeServer: id => dispatch(removeServer(id))
  };
}
function mapStateToProps(state) {
  return {
    isLoading: state.server.isLoading,
    user: state.user.user,
    joinedServers: state.server.joinedServers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
