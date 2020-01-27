import React, { useState } from "react";
import "./Channels.scss";
import Channel from "./Channel";
import AddModal from "../AddModal/AddModal";
import firebase from "../../../firebase";

class Channels extends React.Component {
  state = {
    showDropdown: false,
    showAddModal: false,
    options: [],
    create: ""
  };

  getCategories = () => {
    const category = this.props.selectedServer.category;
    const keys = Object.keys(category);
    const options = [];
    keys.forEach(key => options.push({ name: category[key].name, key }));
    this.setState({ options });
  };

  componentDidMount() {
    this.getCategories();
  }

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
              channel={channelsObj[channel]}
              key={option + channel + i}
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
  handleLeaveServer = () => console.log("leaving channel");
  handleDeleteServer = () => console.log("deleting channel");

  createChannel = (name, option) => {
    // setCreate("");
    firebase
      .database()
      .ref("servers/" + this.props.selectedServer.id)
      .child("category/" + option + "/channels")
      .push({
        name,
        messages: [],
        type: "text"
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
  dropdown = (
    <div className="dropdown">
      <div className="item invite" onClick={this.handleInviteLink}>
        Invite
      </div>
      <div className="item" onClick={this.handleCreateChannel}>
        create channel
      </div>
      <div className="item" onClick={this.handleCategory}>
        create category
      </div>
      {this.props.uid !== this.props.selectedServer.admin.uid ? (
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
  render() {
    console.log("why");

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
        {this.state.showDropdown ? this.dropdown : null}
        {/* {this.props.selectedServer.channels
          ? this.props.selectedServer.channels.map((channel, index) => {
              return (
                <Channel
                  channel={channel}
                  key={this.state.channel.name + index}
                />
              );
            })
          : null} */}
        {this.displayChannels()}
        {this.state.showAddModal ? (
          <AddModal
            handleClose={this.handleClose}
            create={this.state.create}
            options={
              this.state.create === "Channel" ? this.state.options : null
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
