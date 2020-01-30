import React, { Component } from "react";
import "./Discord.scss";
import SidePannel from "./SidePannel/SidePannel";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { selectServer, removeServer } from "../../Reudux/Actions";
import Channels from "./Channels/Channels";
import UserPannel from "./UserPannel/UserPannel";
import Messages from "./Messages/Messages";
import Extra from "./Extra/Extra";

const extra = ["totalServers"];
class Discord extends Component {
  state = {
    server: null,
    channel: {
      categoryID: "general",
      id: "0"
    },
    dm: "totalServers"
  };

  changeCurrentSelected = to => {
    this.setState(to);
  };

  render() {
    const { user, joinedServers, removeServer } = this.props;
    return (
      <div className="discord">
        <SidePannel
          selectedServer={this.state.server}
          changeCurrentSelected={this.changeCurrentSelected}
          firebase={firebase}
          user={user}
          joinedServers={joinedServers}
        />
        {this.state.server !== null ? (
          <Channels
            selectedServer={joinedServers[this.state.server]}
            selectedChannel={this.state.channel}
            removeServer={removeServer}
            uid={user.uid}
            changeCurrentSelected={this.changeCurrentSelected}
          />
        ) : (
          <UserPannel
            changeCurrentSelected={this.changeCurrentSelected}
            selectedDM={this.state.dm}
          />
        )}
        {this.state.server ? (
          <Messages
            server={joinedServers[this.state.server]}
            channel={this.state.channel}
            user={this.props.user}
          />
        ) : extra.includes(this.state.dm) ? (
          <Extra extra={this.state.dm} />
        ) : null}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    removeServer: id => dispatch(removeServer(id))
  };
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    joinedServers: state.server.joinedServers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discord);
