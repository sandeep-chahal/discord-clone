// @flow
import * as React from "react";
import "./Main.scss";
import TotalServer from "../UserPannel/TotalServers/TotalServers";

class Main extends React.Component {
  render() {
    return (
      <div className="main">
        <TotalServer />
      </div>
    );
  }
}

export default Main;
