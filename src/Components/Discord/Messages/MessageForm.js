import React, { useState } from "react";
import firebase from "../../../firebase";
import FileUploadPrev from "./FileUploadPrev";
import uuidv4 from "uuid";
import "emoji-mart/css/emoji-mart.css";
import { Picker as EmojiPicker } from "emoji-mart";
import GiphyPicker from "react-giphy-picker";

const MessageForm = props => {
	const [message, setMessage] = useState("");
	const [file, setFile] = useState(null);
	const [preview, setPreview] = useState(false);
	const [percentage, setPercentage] = useState(null);
	const [showEmojiPicker, setShowEmojiPicker] = useState(false);
	const [showGiphyPicker, setShowGiphyPicker] = useState(false);
	let inputRef = null;

	const createMessage = (message, isTextMessage) => {
		if (props.server) {
			var { serverId, channel } = props.server;
		}
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
		if (props.server) {
			newMessage.sender.role = props.userRole.name;
			newMessage.serverId = serverId;
			newMessage.channelId = channel.id;
		}
		return newMessage;
	};

	const handleSubmit = e => {
		e.preventDefault();
		if (message === "") return;
		const newMessage = createMessage(message, true);
		setMessage("");
		sendMessage(newMessage);
	};

	const handleKeyDown = e => {
		if (e.key === "Enter" && !e.shiftKey) {
			handleSubmit(e);
		}
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
		let path = "";
		if (props.server) {
			const { serverId, channel } = props.server;
			path = "public/" + serverId + "/" + channel.id;
		} else {
			path = "private/" + props.dm.id;
		}
		const storageRef = firebase.storage().ref(path);
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
					sendMessage(newMessage);
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
		setShowEmojiPicker(false);
		if (inputRef) {
			inputRef.focus();
		}
	};
	const setGiphy = giphy => {
		const newMessage = createMessage(giphy.downsized_medium.url, false);
		sendMessage(newMessage);
		setShowGiphyPicker(false);
	};

	const sendMessage = (message, serverID, categoryID, channelID) => {
		const path =
			"messages/" +
			(props.server
				? props.server.serverId + "/" + props.server.channel.id
				: props.dm.id + "/messages");
		firebase
			.database()
			.ref(path)
			.push()
			.set(message);
	};

	return (
		<div
			className="messageform"
			style={{ width: props.server ? "65%" : "81%" }}
		>
			<div className="file">
				<label htmlFor="file">+</label>
				<input type="file" id="file" onChange={openModal} />
			</div>

			<form onSubmit={handleSubmit}>
				<textarea
					type="text"
					value={message}
					onChange={e => setMessage(e.target.value)}
					onKeyPress={e => handleKeyDown(e)}
					placeholder={`# message `}
					autoFocus
					ref={ref => (inputRef = ref)}
				/>
			</form>

			<div className="emoji-picker">
				<span
					role="img"
					className="emoji-picker-btn"
					aria-label="emoji"
					onClick={() => {
						setShowEmojiPicker(!showEmojiPicker);
						setShowGiphyPicker(false);
					}}
				></span>
				{showEmojiPicker ? (
					<EmojiPicker onSelect={emojiObj => setEmoji(emojiObj)} />
				) : null}
			</div>

			<div className="giphy-picker">
				<div
					className="giphy-picker-btn"
					onClick={() => {
						setShowGiphyPicker(!showGiphyPicker);
						setShowEmojiPicker(false);
					}}
				>
					GIF
				</div>
				{showGiphyPicker ? (
					<div className="giphy-picker-box">
						<GiphyPicker onSelected={giphyObj => setGiphy(giphyObj)} />
					</div>
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
