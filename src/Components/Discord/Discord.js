import React, { Component } from "react";
import "./Discord.scss";
import SidePannel from "./SidePannel/SidePannel";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { loadServer, selectServer } from "../../Reudux/Actions";
import Channels from "./Channels/Channels";
import UserPannel from "./UserPannel/UserPannel";

class Discord extends Component {
  render() {
    const {
      user,
      loadServer,
      joinedServers,
      selectServer,
      selectedServer
    } = this.props;
    return (
      <div className="discord">
        <SidePannel
          firebase={firebase}
          user={user}
          loadServer={loadServer}
          joinedServers={joinedServers}
          selectServer={selectServer}
        />
        {selectedServer ? (
          <Channels selectedServer={selectedServer} uid={user.uid} />
        ) : (
          <UserPannel />
        )}
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadServer: id => dispatch(loadServer(id)),
    selectServer: server => dispatch(selectServer(server))
  };
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    joinedServers: state.server.joinedServers,
    selectedServer: state.server.currentSelected
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discord);
