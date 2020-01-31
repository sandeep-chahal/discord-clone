import React, { useState } from "react";
import firebase from "../../../firebase";
import FileUploadPrev from "./FileUploadPrev";
import uuidv4 from "uuid";
// import Picker from "emoji-picker-react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
const MessageForm = props => {
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(false);
  const [percentage, setPercentage] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const createMessage = (message, isTextMessage) => {
    const newMessage = {
      text: isTextMessage ? message : null,
      url: isTextMessage ? null : message,
      sender: {
        name: props.user.displayName,
        photo: props.user.photoURL,
        uid: props.user.uid
      },
      timestamp: new Date().getTime()
    };
    return newMessage;
  };

  const handleSubmit = e => {
    e.preventDefault();
    if (message === "") return;
    const newMessage = createMessage(message, true);
    setMessage("");
    sendMessage(
      newMessage,
      props.serverId,
      props.channel.categoryID,
      props.channel.id
    );
  };

  const openModal = e => {
    setFile(e.target.files[0]);
    if (e.target.files && e.target.files[0]) {
      setPreview(true);
    }
  };

  const closeModal = () => {
    setFile(null);
    setPreview(false);
  };
  const sendFile = () => {
    const storageRef = firebase
      .storage()
      .ref("public/" + props.serverId + "/" + props.channel.id);
    const task = storageRef.child(uuidv4() + ".jpg").put(file);
    task.on(
      "state_changed",
      snap => {
        var percentage =
          Math.round(snap.bytesTransferred / snap.totalBytes) * 100;
        setPercentage(percentage);
      },
      err => {
        console.log(err.message);
        setPercentage(null);
      },
      () => {
        task.snapshot.ref.getDownloadURL().then(url => {
          const newMessage = createMessage(url, false);
          sendMessage(
            newMessage,
            props.serverId,
            props.channel.categoryID,
            props.channel.id
          );
          setPreview(false);
          setFile(null);
          setPercentage(null);
        });
      }
    );
  };

  const setEmoji = emoji => {
    let value = message;

    value += emoji.native;
    setMessage(value);
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
        <input type="file" id="file" onChange={openModal} />
      </div>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder={`# message `}
        />
      </form>

      <div className="emoji-picker">
        <div
          className="emoji-picker-btn"
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
        >
          😀
        </div>
        {showEmojiPicker ? (
          <Picker onSelect={emojiObj => setEmoji(emojiObj)} />
        ) : null}
      </div>
      {preview ? (
        <FileUploadPrev
          file={file}
          closeModal={closeModal}
          sendFile={sendFile}
          percentage={percentage}
        />
      ) : null}
    </div>
  );
};

export default MessageForm;
