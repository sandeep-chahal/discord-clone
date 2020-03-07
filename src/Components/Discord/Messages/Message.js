import React, { useState } from "react";
import moment from "moment";
import { Picker as EmojiPicker } from "emoji-mart";
import firebase from "../../../firebase";
import DMCard from "./DMCard/DMCard";

const Message = props => {
	const [showOptions, setShowOptions] = useState(false);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [showModifyOptions, setShowModifyOptions] = useState(false);
	const [showDMCard, setShowDMCard] = useState(false);
	const { id, message, uid, color, scrollToBottom, path } = props;

	const isTextMessage = message => {
		return message.text;
	};

	const sendReaction = emoji => {
		const newMessage = message;
		if (!newMessage.reactions) {
			newMessage.reactions = {};
		}
		if (newMessage.reactions[emoji.id]) {
			if (newMessage.reactions[emoji.id].users[uid]) {
				if (newMessage.reactions[emoji.id].count === 1) {
					delete newMessage.reactions[emoji.id];
				} else {
					delete newMessage.reactions[emoji.id].users[uid];
					newMessage.reactions[emoji.id].count -= 1;
				}
			} else {
				newMessage.reactions[emoji.id].users[uid] = uid;
				newMessage.reactions[emoji.id].count += 1;
			}
		} else
			newMessage.reactions[emoji.id] = {
				users: { [uid]: uid },
				id: emoji.id,
				emoji: emoji.native,
				count: 1
			};
		firebase
			.database()
			.ref("messages")
			.child(path)
			.child(id)
			.update(newMessage);
	};

	const deleteMessage = () => {
		firebase
			.database()
			.ref("messages")
			.child(path)
			.child(id)
			.remove();
	};

	const copyMessage = async () => {
		if (message.text) await navigator.clipboard.writeText(message.text);
		else await navigator.clipboard.writeText(message.url);
	};

	return (
		<div
			className="message-container"
			onMouseLeave={() => {
				setShowOptions(false);
				setShowEmojiPicker(false);
				setShowModifyOptions(false);
			}}
			onMouseEnter={() => setShowOptions(true)}
		>
			<div className="message">
				<div
					className="user-icon"
					style={{
						backgroundImage: `url(${
							props.user ? props.user.photo : props.message.sender.photo
						})`
					}}
					// ref={ref => (props.user ? null : getPhoto(uid, ref))}
				></div>
				<div className="message-body">
					<div className="message-header">
						<div
							className="user-name"
							style={{ color: color }}
							onClick={() => setShowDMCard(!showDMCard)}
						>
							{message.sender.uid === uid ? "You" : message.sender.name}
							{showDMCard ? (
								<DMCard
									name={message.sender.name}
									uid={message.sender.uid}
									role={message.sender.role}
									roleColor={color}
									close={() => setShowDMCard(false)}
									photo={props.user.photo}
								/>
							) : null}
						</div>
						<div className="message-date">
							{moment(message.timestamp).fromNow()}
						</div>
					</div>
					{isTextMessage(message) ? (
						<div className="message-text">{message.text}</div>
					) : (
						<img
							className="message-file"
							src={message.url}
							alt="Loading...."
							onLoad={scrollToBottom}
						/>
					)}
					<div className="reactions">
						{message.reactions
							? Object.keys(message.reactions).map(reactionKey => (
									<div
										key={reactionKey}
										className="reaction"
										onClick={() =>
											sendReaction({
												id: reactionKey,
												native: message.reactions[reactionKey].emoji
											})
										}
									>
										<div className="emoji">
											{message.reactions[reactionKey].emoji}
										</div>
										<div className="count">
											{message.reactions[reactionKey].count}
										</div>
									</div>
							  ))
							: null}
					</div>
				</div>
				{showOptions ? (
					<div className="message-options">
						<div
							className="reaction-picker"
							onClick={() => setShowEmojiPicker(!showEmojiPicker)}
						>
							☻
							{showEmojiPicker ? (
								<EmojiPicker onSelect={e => sendReaction(e)} />
							) : null}
						</div>
						{true ? (
							<div
								className="message-modify"
								onClick={() => setShowModifyOptions(!showModifyOptions)}
							>
								<div className="dot"></div>
								<div className="dot"></div>
								<div className="dot"></div>
								{showModifyOptions ? (
									<div className="modify-options">
										{message.text ? (
											<div onClick={copyMessage}>copy message</div>
										) : null}
										{message.sender.uid === uid ? (
											<div onClick={deleteMessage}>delete message</div>
										) : null}
									</div>
								) : null}
							</div>
						) : null}
					</div>
				) : null}
			</div>
			<div className="underline"></div>
		</div>
	);
};

export default Message;
