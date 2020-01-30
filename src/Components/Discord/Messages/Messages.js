import React from "react";
import "./Messages.scss";
import Message from "./Message";
import MessageForm from "./MessageForm";

class Messages extends React.Component {
  render() {
    return (
      <div className="messages">
        <div className="header">#General</div>
        <div className="underline"></div>
        <div className="messages-container">
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
          <Message />
        </div>
        <MessageForm />
      </div>
    );
  }
}

export default Messages;
