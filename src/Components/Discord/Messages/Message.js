import React from "react";

const Message = props => {
  return (
    <div className="message">
      <div className="user-icon"></div>
      <div className="message-body">
        <div className="message-header">
          <div className="user-name">spidy</div>
          <div className="message-date">1 minute ago</div>
        </div>
        <div className="message-text">Hello, there nice to meet you</div>
      </div>
      <div className="underline"></div>
    </div>
  );
};

export default Message;
