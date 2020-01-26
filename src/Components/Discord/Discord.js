import React, { Component } from "react";
import SidePannel from "./SidePannel/SidePannel";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { loadJoinedServers } from "../../Reudux/Actions";

class Discord extends Component {
  render() {
    const { user } = this.props;
    return (
      <div className="discord">
        <SidePannel
          firebase={firebase}
          user={user}
          loadJoinedServers={this.props.loadJoinedServers}
        />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadJoinedServers: uid => dispatch(loadJoinedServers(uid))
  };
}

function mapStateToProps(state) {
  return {
    user: state.user.user
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discord);
