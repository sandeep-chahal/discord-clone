import React, { useState } from "react";
import "./Channels.scss";
import Channel from "./Channel";
import AddModal from "../AddModal/AddModal";

const Channels = props => {
  const [showDropdown, setDropdown] = useState(false);
  const [showAddModal, setAddModal] = useState(false);
  const [create, setCreate] = useState(""); //what are we creating channel or category

  const handleClose = () => setAddModal(false);

  const handleInviteLink = () => console.log("getting invite link");
  const handleCreateChannel = () => {
    setAddModal(true);
    setDropdown(false);
    setCreate("Channel");
  };
  const handleCategory = () => {
    setAddModal(true);
    setDropdown(false);
    setCreate("Category");
  };
  const handleLeaveServer = () => console.log("leaving channel");
  const handleDeleteServer = () => console.log("deleting channel");

  const createChannel = (name, option) => {
    setCreate("");
    console.log(name, option);
  };
  const createCategory = (name, type) => {
    setCreate("");
    console.log(name, type);
  };
  const dropdown = (
    <div className="dropdown">
      <div className="item invite" onClick={handleInviteLink}>
        Invite
      </div>
      <div className="item" onClick={handleCreateChannel}>
        create channel
      </div>
      <div className="item" onClick={handleCategory}>
        create category
      </div>
      {props.uid !== props.selectedServer.admin.uid ? (
        <div className="item leave" onClick={handleLeaveServer}>
          leave server
        </div>
      ) : (
        <div className="item delete" onClick={handleDeleteServer}>
          delete server
        </div>
      )}
    </div>
  );

  return (
    <div className="channels">
      <header onClick={() => setDropdown(!showDropdown)}>
        {props.selectedServer.name}
        <span className="arrow"></span>
      </header>
      <div className="underline"></div>
      {showDropdown ? dropdown : null}
      {props.selectedServer.channels.map((channel, index) => {
        return <Channel channel={channel} key={channel.name + index} />;
      })}
      {showAddModal ? (
        <AddModal
          handleClose={handleClose}
          create={create}
          options={
            create === "Channel" ? ["general", "fortinte"] : ["text", "voice"]
          }
          onClick={create == "Channel" ? createChannel : createCategory}
        />
      ) : null}
    </div>
  );
};

export default Channels;
