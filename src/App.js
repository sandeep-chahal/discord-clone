import React, { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner/Spinner";
import { Switch, Route } from "react-router-dom";
import firebase from "./firebase";
const Auth = lazy(() => import("./Components/Auth/Auth"));

class App extends React.Component {
  state = { logged: false };

  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("gg");
        this.setState({ logged: true });
      } else {
        console.log("oops");
      }
    });
  }
  render() {
    if (!this.state.logged)
      return (
        <Suspense fallback={<Spinner />}>
          <Auth />
        </Suspense>
      );
    else return <div>App</div>;
  }
}

export default App;
