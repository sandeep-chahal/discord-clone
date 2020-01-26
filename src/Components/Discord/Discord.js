import React, { Component } from "react";
import SidePannel from "./SidePannel/SidePannel";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { loadServer, selectServer } from "../../Reudux/Actions";

class Discord extends Component {
  render() {
    const { user, loadServer, joinedServers, selectServer } = this.props;
    return (
      <div className="discord">
        <SidePannel
          firebase={firebase}
          user={user}
          loadServer={loadServer}
          joinedServers={joinedServers}
          selectServer={selectServer}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadServer: id => dispatch(loadServer(id)),
    selectServer: id => dispatch(selectServer(id))
  };
}

function mapStateToProps(state) {
  return {
    user: state.user.user,
    joinedServers: state.server.joinedServers
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discord);
