import React, { Component } from "react";
import SidePannel from "./SidePannel/SidePannel";
import firebase from "../../firebase";

class Discord extends Component {
  render() {
    return (
      <div className="discord">
        <SidePannel firebase={firebase} />
      </div>
    );
  }
}

export default Discord;
