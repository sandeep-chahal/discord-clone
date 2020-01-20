import React, { lazy, Suspense } from "react";
const Auth = lazy(() => import("./Components/Auth/Auth"));

class App extends React.Component {
  state = { isLoading: true };

  render() {
    if (!this.state.isLoading)
      return (
        <Suspense fallback={<div>...Loading</div>}>
          <Auth />
        </Suspense>
      );
    else return <div>App</div>;
  }
}

export default App;
