import React from "react";
import "./UserBar.scss";
import firebase from "firebase";

const UserBar = props => {
	const user = firebase.auth().currentUser;

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
				<div className="icon settings-icon"></div>
			</div>
		</div>
	);
};
export default UserBar;
