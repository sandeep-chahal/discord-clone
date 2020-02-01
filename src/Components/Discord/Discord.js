import React, { Component } from "react";
import "./Discord.scss";
import SidePannel from "./SidePannel/SidePannel";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { removeServer } from "../../Reudux/Actions";
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
    dm: "totalServers",
    role: null,
    roles: null
  };

  changeCurrentSelected = to => {
    if (to.server) {
      const userRole = this.props.joinedServers[to.server].users[
        this.props.user.uid
      ].role;
      const roles = this.props.joinedServers[to.server].roles;
      const role = this.props.joinedServers[to.server].roles[userRole] || null;
      to.role = role;
      to.roles = roles;
    }
    this.setState(to);
  };

  getMessages = messages => {
    try {
      return messages[this.state.server][this.state.channel.id];
    } catch (e) {
      return null;
    }
  };

  render() {
    const { user, joinedServers, removeServer, messages } = this.props;
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
            userRole={this.state.role}
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
            messages={this.getMessages(messages)}
            channel={this.state.channel}
            user={this.props.user}
            userRole={this.state.role}
            roles={this.state.roles}
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
    joinedServers: state.server.joinedServers,
    messages: state.server.messages
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discord);
