import React, { Component } from "react";
import "./Discord.scss";
import SidePannel from "./SidePannel/SidePannel";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { selectServer, removeServer } from "../../Reudux/Actions";
import Channels from "./Channels/Channels";
import UserPannel from "./UserPannel/UserPannel";
import Main from "./Main/Main";

class Discord extends Component {
  componentDidMount() {
    // this.addListener(this.props.joinedServers);
  }
  // addListener = servers => {
  //   servers.forEach((server, i) => {
  //     firebase
  //       .database()
  //       .ref("servers")
  //       .child(server.id)
  //       .on("value", snap => {
  //         if (snap.val() === null) console.log("oooooooo");
  //         else this.props.updateServer(i, snap.val());
  //       });
  //   });
  // };

  render() {
    const {
      user,
      joinedServers,
      selectServer,
      selectedServer,
      removeServer
    } = this.props;
    return (
      <div className="discord">
        <SidePannel
          firebase={firebase}
          user={user}
          joinedServers={joinedServers}
          selectServer={selectServer}
          selectedServer={selectedServer}
        />
        {selectedServer !== null ? (
          <Channels
            selectServer={selectServer}
            selectedServer={joinedServers[selectedServer]}
            removeServer={removeServer}
            uid={user.uid}
          />
        ) : (
          <UserPannel />
        )}
        <Main />
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    selectServer: index => dispatch(selectServer(index)),
    removeServer: id => dispatch(removeServer(id))
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
