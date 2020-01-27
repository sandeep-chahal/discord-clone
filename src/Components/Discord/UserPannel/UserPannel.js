import React from "react";
import "./UserPannel.scss";

class UserPannel extends React.Component {
  state = {
    selected: "server"
  };

  changeSelected = to => {
    this.setState({ selected: to });
  };

  render() {
    return (
      <div className="userpannel">
        <div
          className={this.state.selected === "server" ? "active item" : "item"}
          onClick={() => this.changeSelected("server")}
        >
          <span className="server-icon"></span>Servers
        </div>
        <div
          className={
            this.state.selected === "activity" ? "active item" : "item"
          }
          onClick={() => this.changeSelected("activity")}
        >
          <span className="activity-icon"></span>activity
        </div>

        <h3>DIRECT MESSAGE</h3>
      </div>
    );
  }
}

export default UserPannel;
