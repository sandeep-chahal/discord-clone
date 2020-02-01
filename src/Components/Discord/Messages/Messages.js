import React from "react";
import "./Messages.scss";
import Message from "./Message";
import MessageForm from "./MessageForm";

class Messages extends React.Component {
  message_container = null;
  displayMessages = messages => {
    const { user, roles, server } = this.props;
    const keys = Object.keys(messages);
    return keys.map(key => (
      <Message
        key={key}
        uid={user.uid}
        id={key}
        message={messages[key]}
        color={roles[messages[key].sender.role].color}
      />
    ));
  };

  componentDidUpdate() {
    this.scrollToBottom();
    setTimeout(this.scrollToBottom, 1000);
  }
  componentDidMount() {
    this.scrollToBottom();
    setTimeout(this.scrollToBottom, 1000);
  }

  scrollToBottom = () => {
    if (this.message_container)
      this.message_container.scrollTo(0, this.message_container.scrollHeight);
  };

  render() {
    const { server, channel, user } = this.props;
    // let messages;
    // try {
    //   messages =
    //     server.category[channel.categoryID].channels[channel.id].messages;
    // } catch (e) {}
    return (
      <div className="messages-wrapper">
        <div className="messages">
          <div className="header">#General</div>
          <div className="underline"></div>
          <div
            className="messages-container"
            ref={el => (this.message_container = el)}
          >
            {this.props.messages
              ? this.displayMessages(this.props.messages)
              : null}
          </div>
          <MessageForm
            serverId={server.id}
            channel={channel}
            user={user}
            userRole={this.props.userRole}
          />
        </div>
        <div className="server-users"></div>
      </div>
    );
  }
}

export default Messages;
