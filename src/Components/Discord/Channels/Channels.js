import React, { useState } from "react";
import "./Channels.scss";
import Channel from "./Channel";
import AddModal from "../AddModal/AddModal";
import firebase from "../../../firebase";

class Channels extends React.Component {
  state = {
    showDropdown: false,
    showAddModal: false,
    create: ""
  };

  getCategories = () => {
    const category = this.props.selectedServer.category;
    const keys = Object.keys(category);

    const options = keys.map(key => ({
      ...category[key],
      key
    }));
    return options;
  };

  displayChannels = () => {
    const categoriesObj = this.props.selectedServer.category;
    const categoriesKeys = Object.keys(categoriesObj || {});
    return categoriesKeys.map((option, i) => {
      const channelsObj = this.props.selectedServer.category[option].channels;
      const channelsKeys = Object.keys(channelsObj || {});

      return (
        <div className="category" key={option + i}>
          <h3>{categoriesObj[option].name}</h3>
          {channelsKeys.map((channel, i) => (
            <Channel
              active={channel === this.props.selectedChannel.id}
              id={channel}
              channel={channelsObj[channel]}
              key={channel}
              onClick={() => {
                this.props.changeCurrentSelected({
                  channel: {
                    categoryID: channelsObj[channel].categoryID,
                    id: channel
                  }
                });
              }}
            />
          ))}
        </div>
      );
    });
  };

  handleClose = () => this.setState({ showAddModal: false });

  handleCreateChannel = () => {
    this.setState({
      create: "Channel",
      showAddModal: true,
      showDropdown: false
    });
  };
  handleCategory = () => {
    this.setState({
      create: "Category",
      showAddModal: true,
      showDropdown: false
    });
  };
  handleInviteLink = () => console.log("getting invite link");
  handleLeaveServer = () => {
    const serverId = this.props.selectedServer.id;
    firebase
      .database()
      .ref("servers")
      .child(serverId)
      .off("value");
    firebase
      .database()
      .ref("servers/" + serverId + "/users/")
      .child(this.props.uid)
      .remove()
      .then(() => {
        console.log("servers/" + serverId + "/users/" + this.props.uid);

        firebase
          .database()
          .ref("users/" + this.props.uid + "/servers")
          .child(serverId)
          .remove()
          .then(() => {
            const selectedServerId = this.props.selectedServer.id;
            this.props.changeCurrentSelected({ server: null });
            this.props.removeServer(selectedServerId);
          })
          .catch(err => console.log(err.message));
      });
  };
  handleDeleteServer = () => {
    this.props.changeCurrentSelected({
      server: null
    });
    // firebase
    //   .database()
    //   .ref("servers")
    //   .child(this.props.selectedServer.id)
    //   .off("value");
    firebase
      .database()
      .ref("servers")
      .child(this.props.selectedServer.id)
      .remove()
      .then(() => console.log("done"))
      .catch(err => console.log(err.message));
    firebase
      .database()
      .ref("messages")
      .child(this.props.selectedServer.id)
      .remove()
      .then(() => console.log("done"))
      .catch(err => console.log(err.message));
  };

  createChannel = (name, option) => {
    firebase
      .database()
      .ref("servers/" + this.props.selectedServer.id)
      .child("category/" + option + "/channels")
      .push({
        name,
        messages: [],
        type: "text",
        categoryID: option
      })
      .then(() => this.setState({ showAddModal: false }));
  };

  createCategory = (name, type) => {
    firebase
      .database()
      .ref("servers/" + this.props.selectedServer.id)
      .child("category/")
      .push({
        name,
        channels: []
      })
      .then(() => this.setState({ showAddModal: false }));
  };
  dropdown = () => {
    const isAdmin = this.props.userRole.isAdmin;
    return (
      <div className="dropdown">
        <div className="item invite" onClick={this.handleInviteLink}>
          Invite
        </div>
        {isAdmin ? (
          <div className="item" onClick={this.handleCreateChannel}>
            create channel
          </div>
        ) : null}
        {isAdmin ? (
          <div className="item" onClick={this.handleCategory}>
            create category
          </div>
        ) : null}
        {!isAdmin ? (
          <div className="item leave" onClick={this.handleLeaveServer}>
            leave server
          </div>
        ) : (
          <div className="item delete" onClick={this.handleDeleteServer}>
            delete server
          </div>
        )}
      </div>
    );
  };
  render() {
    return (
      <div className="channels">
        <header
          onClick={() =>
            this.setState(prev => ({ showDropdown: !prev.showDropdown }))
          }
        >
          {this.props.selectedServer.name}
          <span className="arrow"></span>
        </header>
        <div className="underline"></div>
        {this.state.showDropdown ? this.dropdown() : null}

        {this.displayChannels()}
        {this.state.showAddModal ? (
          <AddModal
            handleClose={this.handleClose}
            create={this.state.create}
            options={
              this.state.create === "Channel" ? this.getCategories() : null
            }
            onClick={
              this.state.create == "Channel"
                ? this.createChannel
                : this.createCategory
            }
          />
        ) : null}
      </div>
    );
  }
}

export default Channels;
