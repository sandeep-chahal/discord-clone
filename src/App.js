import React, { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner/Spinner";
import { Switch, Route } from "react-router-dom";
const Auth = lazy(() => import("./Components/Auth/Auth"));

class App extends React.Component {
  state = { logged: false };
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
