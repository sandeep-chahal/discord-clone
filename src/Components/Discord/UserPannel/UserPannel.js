import React from "react";
import "./UserPannel.scss";

class UserPannel extends React.Component {
  changeSelected = to => {
    this.props.changeCurrentSelected({
      dm: to
    });
  };

  render() {
    return (
      <div className="userpannel">
        <div
          className={
            this.props.selectedDM === "totalServers" ? "active item" : "item"
          }
          onClick={() => this.changeSelected("totalServers")}
        >
          <span className="server-icon"></span>Servers
        </div>

        <div
          className={
            this.props.selectedDM === "activity" ? "active item" : "item"
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
