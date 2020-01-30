import React from "react";
import "./Messages.scss";
import Message from "./Message";
import MessageForm from "./MessageForm";

class Messages extends React.Component {
  message_container = null;
  displayMessages = messages => {
    const keys = Object.keys(messages);
    return keys.map(key => (
      <Message
        key={key}
        uid={this.props.user.uid}
        id={key}
        message={messages[key]}
      />
    ));
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }
  componentDidMount() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.message_container)
      this.message_container.scrollTo(0, this.message_container.scrollHeight);
  };

  render() {
    const { server, channel, user } = this.props;
    const messages =
      server.category[channel.categoryID].channels[channel.id].messages;
    return (
      <div className="messages">
        <div className="header">#General</div>
        <div className="underline"></div>
        <div
          className="messages-container"
          ref={el => (this.message_container = el)}
        >
          {messages ? this.displayMessages(messages) : null}
        </div>
        <MessageForm serverId={server.id} channel={channel} user={user} />
      </div>
    );
  }
}

export default Messages;
