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
  removeServer,
  addMessages,
  selectServer
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
    const presenceRef = firebase
      .database()
      .ref("users")
      .child(uid)
      .child("presence");

    firebase
      .database()
      .ref(".info/connected")
      .on("value", snap => {
        presenceRef.set(snap.val());
      });
    presenceRef.onDisconnect().set(false);

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
    const keys = Object.keys(servers || {});
    for (let i = 0; i < keys.length; i++) {
      firebase
        .database()
        .ref("servers/")
        .child(keys[i])
        .child("/users/")
        .child(this.props.user.uid)
        .child("presence")
        .set(true);
      firebase
        .database()
        .ref("servers/")
        .child(keys[i])
        .on("value", snap => {
          if (snap.val()) {
            const server = snap.val();
            this.props.updateServer(keys[i], server);
            this.addListnerToChannels(server);
          } else this.removeDeletedServer(keys[i], this.props.user.uid);
        });
      firebase
        .database()
        .ref("servers/")
        .child(keys[i])
        .child("/users/")
        .child(this.props.user.uid)
        .child("presence")
        .onDisconnect()
        .set(false);
    }
    this.props.setLoading(false);
  };
  addListnerToChannels = server => {
    firebase
      .database()
      .ref("messages")
      .child(server.id)
      .on("value", snap => {
        const channels = snap.val();
        this.props.addMessages(server.id, channels);
      });
  };
  removeDeletedServer = (id, uid) => {
    //remove from state
    this.props.selectServer(null);
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
          <Route path="/*">
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
    removeServer: id => dispatch(removeServer(id)),
    selectServer: id => dispatch(selectServer(id)),
    addMessages: (serverId, channels) =>
      dispatch(addMessages(serverId, channels))
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
