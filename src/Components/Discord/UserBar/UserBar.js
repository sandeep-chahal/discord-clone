import React, { useState } from "react";
import "./UserBar.scss";
import firebase from "../../../firebase";
import UserSettings from "./UserSettings";
import { connect } from "react-redux";

const UserBar = props => {
	const [showSettings, setShowSettings] = useState(false);
	const [uploading, setUploading] = useState(false);

	const user = firebase.auth().currentUser;

	const updateProfile = file => {
		//uploading file
		const task = firebase
			.storage()
			.ref("users/")
			.child(user.uid + ".jpg")
			.put(file);
		task.on(
			"state_changed",
			snap => {
				setUploading(true);
			},
			err => {
				setUploading(false);
			},
			() => {
				task.snapshot.ref.getDownloadURL().then(url => {
					//updating profile
					firebase
						.auth()
						.currentUser.updateProfile({
							photoURL: url
						})
						.then(() => {
							//updating profile in database
							firebase
								.database()
								.ref("users")
								.child(user.uid + "/profile")
								.child("avatar")
								.set(url)
								.then(() => {
									updateProfileOnServers(Object.keys(props.servers || {}), url);
									setShowSettings(false);
									setUploading(false);
								})
								.catch(err => setUploading(false));
						})
						.catch(err => setUploading(false));
				});
			}
		);
	};

	const updateProfileOnServers = (servers, url) => {
		servers.forEach(server => {
			firebase
				.database()
				.ref("servers/")
				.child(server)
				.child("/users/")
				.child(user.uid)
				.update({
					photo: url
				});
		});
	};

	return (
		<div className="userbar">
			<div>
				<div
					className="photo"
					style={{ backgroundImage: `url(${user.photoURL})` }}
				></div>
				<div className="">{user.displayName}</div>
			</div>
			<div>
				<div className="icon mic-icon"></div>
				<div className="icon headphone-icon"></div>
				<div
					className="icon settings-icon"
					onClick={() => setShowSettings(true)}
				></div>
			</div>
			{showSettings ? (
				<UserSettings
					updateProfile={updateProfile}
					photo={user.photoURL}
					uploading={uploading}
					close={() => !uploading && setShowSettings(false)}
				/>
			) : null}
		</div>
	);
};

const mapStateToProps = state => ({
	servers: state.server.joinedServers
});

export default connect(mapStateToProps)(UserBar);
