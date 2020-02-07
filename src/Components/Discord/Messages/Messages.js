import React from "react";
import "./Messages.scss";
import Message from "./Message";
import MessageForm from "./MessageForm";

class Messages extends React.Component {
  message_container = null;
  displayMessages = messages => {
    const { user, roles, server, channel } = this.props;

    const keys = Object.keys(messages);
    return keys.map(key => (
      <Message
        key={key}
        serverId={server.id}
        channelId={channel.id}
        uid={user.uid}
        id={key}
        message={messages[key]}
        color={roles ? roles[messages[key].sender.role].color : null}
        scrollToBottom={this.scrollToBottom}
      />
    ));
  };

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom = () => {
    if (this.message_container)
      this.message_container.scrollTo(0, this.message_container.scrollHeight);
  };

  render() {
    const { server, channel, user, headerName, dm, messages } = this.props;
    return (
      <div className="messages">
        <div className="header">{headerName}</div>
        <div className="underline"></div>
        <div
          className="messages-container"
          id="scrolldownpls"
          ref={el => (this.message_container = el)}
        >
          {this.props.messages
            ? this.displayMessages(server ? messages : dm.messages)
            : null}
        </div>
        <MessageForm
          server={
            server
              ? {
                  serverId: server.id,
                  channel: channel
                }
              : null
          }
          dm={this.props.dm}
          user={user}
          userRole={this.props.userRole}
        />
      </div>
    );
  }
}

export default Messages;
