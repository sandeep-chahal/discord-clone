import React, { useState } from "react";
import firebase from "../../../firebase";

const MessageForm = props => {
  const [message, setMessage] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (message === "") return;
    const newMessage = {
      text: message,
      sender: {
        name: props.user.displayName,
        photo: props.user.photoURL,
        uid: props.user.uid
      },
      timestamp: new Date().getTime()
    };
    setMessage("");
    sendMessage(
      newMessage,
      props.serverId,
      props.channel.categoryID,
      props.channel.id
    );
  };

  const sendMessage = (message, serverID, categoryID, channelID) => {
    const path =
      "servers/" +
      serverID +
      "/category/" +
      categoryID +
      "/channels/" +
      channelID;
    firebase
      .database()
      .ref(path)
      .child("messages")
      .push()
      .set(message);
  };

  return (
    <div className="messageform">
      <div className="file">
        <label htmlFor="file">+</label>
        <input type="file" id="file" />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="#message"
        />
      </form>
    </div>
  );
};

export default MessageForm;
