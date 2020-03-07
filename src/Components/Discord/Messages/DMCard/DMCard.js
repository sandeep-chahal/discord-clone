import React, { useState } from "react";
import "./DMCard.scss";
import firebase from "../../../../firebase";

const DMCard = ({ name, uid, role, roleColor, close, photo }) => {
	const [message, setMessage] = useState("");
	const currentUser = firebase.auth().currentUser;

	const handleSubmit = e => {
		if (e.key === "Enter") {
			const path =
				currentUser.uid < uid ? currentUser.uid + uid : uid + currentUser.uid;
			firebase
				.database()
				.ref("messages")
				.child(path)
				.once("value", snap => {
					if (snap.val()) {
						firebase
							.database()
							.ref("messages")
							.child(path)
							.child("messages")
							.push()
							.set({
								sender: {
									uid: currentUser.uid,
									name: name
								},
								text: message,
								timestamp: firebase.database.ServerValue.TIMESTAMP
							});
					} else {
						firebase
							.database()
							.ref("messages")
							.child(path)
							.set({
								user1: {
									uid: currentUser.uid,
									photo: firebase.auth().currentUser.photoURL,
									name: firebase.auth().currentUser.displayName
								},
								user2: {
									uid: uid,
									name: name,
									photo: photo
								},
								messages: {
									0: {
										text: message,
										sender: {
											uid: currentUser.uid,
											name: currentUser.displayName,
											photo: currentUser.photoURL
										},
										timestamp: firebase.database.ServerValue.TIMESTAMP
									}
								}
							});
						firebase
							.database()
							.ref("users")
							.child(uid)
							.child("dm")
							.child(path)
							.set(path);
						firebase
							.database()
							.ref("users")
							.child(currentUser.uid)
							.child("dm")
							.child(path)
							.set(path);
					}
				});
			setMessage("");
			close();
		}
	};
	const getPhoto = (uid, ref) => {
		if (!ref) return;
		firebase
			.database()
			.ref("users/")
			.child(uid)
			.child("profile/avatar")
			.once("value", snap => {
				ref.style.backgroundImage = `url(${snap.val()})`;
			});
	};
	return (
		<div className="dmcard" onMouseLeave={close}>
			<div className="dmcard-header">
				<div
					className="userPhoto"
					// style={{ backgroundImage: `url(${photo})` }}
					ref={ref => getPhoto && getPhoto(uid, ref)}
				></div>
				<div className="name">{name}</div>
			</div>
			<div className="role-wrapper">
				<div className="roleLabel">Role</div>
				<div
					className="role"
					style={{ border: `1px solid ${roleColor}`, color: `${roleColor}` }}
				>
					{role !== "normal" ? role : "no role"}
				</div>
			</div>
			{currentUser.uid !== uid ? (
				<textarea
					onKeyDown={handleSubmit}
					autoFocus
					onChange={e => setMessage(e.target.value)}
					value={message}
				></textarea>
			) : null}
		</div>
	);
};

export default DMCard;
