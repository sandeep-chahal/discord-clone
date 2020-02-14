import React, { lazy, Suspense } from "react";
import Spinner from "./Components/Spinner/Spinner";
import { Switch, Route, withRouter } from "react-router-dom";
import firebase from "./firebase";
import { connect } from "react-redux";
import {
	login,
	setServerLoading,
	loadTotalServers,
	updateServer,
	removeServer,
	addMessages,
	selectServer,
	addDm,
	setCall
} from "./Reudux/Actions";
const Auth = lazy(() => import("./Components/Auth/Auth"));
const Discord = lazy(() => import("./Components/Discord/Discord"));

class App extends React.Component {
	componentDidMount() {
		firebase.auth().onAuthStateChanged(user => {
			if (user) {
				this.props.history.push("/");
				this.props.login(user);
				this.props.loadTotalServers();
				this.addListnerToUser(user.uid);
			} else {
				this.props.history.replace("/login");
				this.props.setLoading(false);
			}
		});
	}

	addListnerToUser = uid => {
		const presenceRef = firebase
			.database()
			.ref("users")
			.child(uid)
			.child("presence");

		firebase
			.database()
			.ref(".info/connected")
			.on("value", snap => {
				presenceRef.set(snap.val());
			});
		presenceRef.onDisconnect().set(false);

		firebase
			.database()
			.ref("users")
			.child(uid)
			.on("value", snap => {
				const userData = snap.val();
				this.props.setCall(userData.call);
				this.fetchServers(userData.servers);
				this.fetchDm(userData.dm);
			});
	};

	fetchServers = servers => {
		const keys = Object.keys(servers || {});
		for (let i = 0; i < keys.length; i++) {
			this.addPresence(keys[i]);

			//fetching server
			firebase
				.database()
				.ref("servers/")
				.child(keys[i])
				.on("value", snap => {
					if (snap.val()) {
						const server = snap.val();
						this.props.updateServer(keys[i], server);
						this.addListnerToChannels(server);
					} else this.removeDeletedServer(keys[i], this.props.user.uid);
				});
			firebase
				.database()
				.ref("servers/")
				.child(keys[i])
				.child("/users/")
				.child(this.props.user.uid)
				.child("presence")
				.onDisconnect()
				.set(false);
		}
		this.props.setLoading(false);
	};
	addListnerToChannels = server => {
		firebase
			.database()
			.ref("messages")
			.child(server.id)
			.on("value", snap => {
				const channels = snap.val();
				this.props.addMessages(server.id, channels);
			});
	};
	removeDeletedServer = (id, uid) => {
		//remove from state
		this.props.selectServer(null);
		this.props.removeServer(id);
		//remove from db
		firebase
			.database()
			.ref("users/" + uid + "/servers/")
			.child(id)
			.remove();
	};

	fetchDm = dm => {
		const keys = Object.keys(dm || {});
		keys.forEach(key => {
			firebase
				.database()
				.ref("messages")
				.child(key)
				.on("value", snap => {
					this.props.addDm(key, snap.val());
				});
		});
	};

	addPresence = serverId => {
		firebase
			.database()
			.ref("servers/")
			.child(serverId)
			.once("value", snap => {
				if (snap.exists()) {
					firebase
						.database()
						.ref("servers/")
						.child(serverId)
						.child("/users/")
						.child(this.props.user.uid)
						.child("presence")
						.set(true);
				}
			});
	};

	render() {
		if (this.props.isLoading) return <Spinner />;
		else
			return (
				<Switch>
					<Route path="/(login|register)">
						<Suspense fallback={<Spinner />}>
							<Auth />
						</Suspense>
					</Route>
					<Route path="/*">
						<Suspense fallback={<Spinner />}>
							<Discord />
						</Suspense>
					</Route>
				</Switch>
			);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		login: user => dispatch(login(user)),
		setLoading: isLoading => dispatch(setServerLoading(isLoading)),
		loadTotalServers: () => dispatch(loadTotalServers()),
		updateServer: (id, server) => dispatch(updateServer(id, server)),
		addDm: (id, dms) => dispatch(addDm(id, dms)),
		removeServer: id => dispatch(removeServer(id)),
		selectServer: id => dispatch(selectServer(id)),
		addMessages: (serverId, channels) =>
			dispatch(addMessages(serverId, channels)),
		setCall: call => dispatch(setCall(call))
	};
}
function mapStateToProps(state) {
	return {
		isLoading: state.server.isLoading,
		user: state.user.user,
		joinedServers: state.server.joinedServers
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(App));
