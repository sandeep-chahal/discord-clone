import React, { Component } from "react";
import "./Discord.scss";
import SidePannel from "./SidePannel/SidePannel";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { loadServer, selectServer, updateServer } from "../../Reudux/Actions";
import Channels from "./Channels/Channels";
import UserPannel from "./UserPannel/UserPannel";

class Discord extends Component {
  componentDidMount() {
    this.addListener(this.props.joinedServers);
  }
  addListener = servers => {
    servers.forEach((server, i) => {
      firebase
        .database()
        .ref("servers")
        .child(server.id)
        .on("value", snap => {
          this.props.updateServer(i, snap.val());
        });
    });
  };

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
        {selectedServer !== null ? (
          <Channels
            selectedServer={joinedServers[selectedServer]}
            uid={user.uid}
          />
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
    selectServer: index => dispatch(selectServer(index)),
    updateServer: (index, value) => dispatch(updateServer(index, value))
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
