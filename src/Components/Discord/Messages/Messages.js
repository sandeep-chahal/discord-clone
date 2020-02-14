import React from "react";
import "./Messages.scss";
import Message from "./Message";
import MessageForm from "./MessageForm";

class Messages extends React.Component {
	state = {
		filteredMessages: null,
		searchValue: ""
	};

	message_container = null;
	displayMessages = messages => {
		const { user, roles, server, channel, dm } = this.props;
		const path = server ? server.id + "/" + channel.id : dm.id + "/messages";

		const keys = Object.keys(
			(this.state.filteredMessages ? this.state.filteredMessages : messages) ||
				{}
		);
		return keys.map(key => (
			<Message
				key={key}
				path={path}
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

	handleSearchInput = e => {
		this.setState({ searchValue: e.target.value }, () => {
			if (this.state.searchValue.length > 2) {
				const messages = this.props.messages || this.props.dm.messages;
				const keys = Object.keys(messages || {});
				const filteredMessages = {};
				keys.forEach(key => {
					if (
						(messages[key].text &&
							messages[key].text.includes(this.state.searchValue)) ||
						messages[key].sender.name.includes(this.state.searchValue)
					)
						filteredMessages[key] = messages[key];
				});
				this.setState({ filteredMessages: filteredMessages });
			} else {
				this.setState({ filteredMessages: null });
			}
		});
	};

	handleAudioCallClick = (dm, user, type) => {
		const callee = dm.user1.uid === user.uid ? dm.user2.uid : dm.user1.uid;
		const caller = user.uid;
		console.log(callee, caller, user.uid);

		const call = {
			caller,
			callee,
			type
		};
		this.props.startAudioCall(call);
	};

	render() {
		const { server, channel, user, headerName, dm, messages } = this.props;
		return (
			<div className="messages" style={{ width: server ? "65vw" : "81vw" }}>
				<div className="header">
					<div className="header-name">{headerName}</div>
					<div className="header-options">
						{dm ? (
							<div className="call-btn">
								<div
									className="video-call-btn"
									onClick={() => this.handleAudioCallClick(dm, user, "video")}
								></div>
								<div
									className="audio-call-btn"
									onClick={() => this.handleAudioCallClick(dm, user, "audio")}
								></div>
							</div>
						) : null}
						<input
							className="filterInput"
							type="text"
							onChange={this.handleSearchInput}
							placeholder="search"
						/>
					</div>
				</div>
				<div className="underline"></div>
				<div
					className="messages-container"
					id="scrolldownpls"
					ref={el => (this.message_container = el)}
				>
					{this.displayMessages(server ? messages : dm.messages)}
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
