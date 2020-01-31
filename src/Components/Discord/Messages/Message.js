import React from "react";
import moment from "moment";

const Message = ({ id, message, uid }) => {
  const isTextMessage = message => {
    return message.text;
  };

  return (
    <div className="message-container">
      <div className="message">
        <div
          className="user-icon"
          style={{ backgroundImage: `url(${message.sender.photo})` }}
        ></div>
        <div className="message-body">
          <div className="message-header">
            <div className="user-name">
              {message.sender.uid === uid ? "you" : message.sender.name}
            </div>
            <div className="message-date">
              {moment(message.timestamp).fromNow()}
            </div>
          </div>
          {isTextMessage(message) ? (
            <div className="message-text">{message.text}</div>
          ) : (
            <img className="message-file" src={message.url} alt="Loading...." />
          )}
        </div>
      </div>
      <div className="underline"></div>
    </div>
  );
};

export default Message;
