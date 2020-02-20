import React from "react";
import User from "./User";
import { connect } from "react-redux";

const ServerUsers = props => {
	const displayUsers = (_roles, users) => {
		const roles = { ..._roles };
		roles["online"] = {};
		roles["online"].users = {};
		roles["offline"] = {};
		roles["offline"].users = {};
		Object.keys(users).forEach(_user => {
			const user = users[_user];
			if (user.role === "normal") {
				if (user.presence) {
					roles["online"].users[_user] = user;
				} else {
					roles["offline"].users[_user] = user;
				}
			} else {
				if (!roles[user.role].users) roles[user.role].users = {};
				roles[user.role].users[_user] = user;
			}
		});

		let rolesKeys = Object.keys(roles);

		return rolesKeys.map(role => {
			const usersKeys = Object.keys(roles[role].users || {});
			return usersKeys.length ? (
				<div key={role} className="category-container">
					<div className="category">
						{role} - {usersKeys.length}
					</div>
					{usersKeys.map(user => (
						<User
							key={user}
							user={roles[role].users[user]}
							color={roles[role].color}
						/>
					))}
				</div>
			) : null;
		});
	};

	return (
		<div className="server-users">{displayUsers(props.roles, props.users)}</div>
	);
};

function mapStateToProps(state) {
	return {
		user: state.user.user,
		joinedServers: state.server.joinedServers
	};
}

export default connect(mapStateToProps)(ServerUsers);
