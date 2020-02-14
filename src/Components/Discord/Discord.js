import React, { Component } from "react";
import "./Discord.scss";
import SidePannel from "./SidePannel/SidePannel";
import firebase from "../../firebase";
import { connect } from "react-redux";
import { removeServer, selectServer } from "../../Reudux/Actions";
import Channels from "./Channels/Channels";
import UserPannel from "./UserPannel/UserPannel";
import Messages from "./Messages/Messages";
import Extra from "./Extra/Extra";
import ServerUsers from "./Messages/ServerInfo/ServerUsers";
import Peer from "peerjs";

const extra = ["totalServers", "activity"];
class Discord extends Component {
	state = {
		call: null,
		peer: null,
		audioRemoteStream: null
	};

	startAudioCall = call => {
		console.clear();
		const peer = new Peer();
		this.setState({ peer: peer });
		peer.on("open", id => {
			const key = firebase
				.database()
				.ref("calls")
				.push()
				.getKey();
			this.addDataToFireBase("calls/" + key, {
				...call,
				id
			});
			this.setState({ call: { ...call, id } });
			this.addDataToFireBase("users/" + call.callee + "/call/", key);
			this.addDataToFireBase("users/" + call.caller + "/call/", key);
			firebase
				.database()
				.ref("calls")
				.child(key)
				.onDisconnect()
				.remove();
		});

		peer.on("call", call => {
			console.log("getting call");
			navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
				call.answer(stream);
			});
			call.on("stream", remoteStream => {
				console.log("getting stream");
				this.setState({ audioRemoteStream: remoteStream });
			});
		});
	};

	componentDidMount() {
		document.addEventListener("keydown", e => {
			if (e.key === "Enter") {
				const id = prompt("enter key");
				const peer = new Peer();
				peer.connect(id);
				navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
					const call = peer.call(id, stream);
					call.on("stream", remoteStream => {
						console.log("yeahhh");
					});
				});
			}
		});
	}

	componentWillReceiveProps(props) {
		if (this.state.call == null && props.call) {
			this.setState({ call: props.call });
			firebase
				.database()
				.ref("calls")
				.child(props.call)
				.once("value", snap => {
					const callObj = snap.val();
					this.setState({ call: callObj });
					alert("someone is calling");

					if (true) {
						const peer = new Peer();
						this.setState({ peer: peer });
						console.log(peer);
						peer.connect(callObj.id);
						if (callObj.type === "audio") {
							navigator.mediaDevices
								.getUserMedia({ audio: true })
								.then(stream => {
									const call = peer.call(callObj.id, stream);
									call.on("stream", remoteStream => {
										console.log("connected");
										this.setState({ audioRemoteStream: remoteStream });
									});
								});
						}
					}
				});
		}
	}

	addDataToFireBase = (ref, data) => {
		firebase
			.database()
			.ref(ref)
			.set(data);
		firebase
			.database()
			.ref(ref)
			.onDisconnect()
			.remove();
	};

	changeCurrentSelected = to => {
		if (to.server) {
			const userRole = this.props.joinedServers[to.server].users[
				this.props.user.uid
			].role;
			const roles = this.props.joinedServers[to.server].roles;
			const role = this.props.joinedServers[to.server].roles[userRole] || null;
			to.role = role;
			to.roles = roles;
		}
		this.props.selectServer(to);
	};

	getMessages = messages => {
		try {
			return messages[this.props.server][this.props.channel.id];
		} catch (e) {
			return null;
		}
	};

	render() {
		const {
			user,
			joinedServers,
			removeServer,
			messages,
			server,
			channel,
			role,
			roles,
			selectedDM,
			dm,
			dms
		} = this.props;
		return (
			<div className="discord">
				<SidePannel
					selectedServer={server}
					changeCurrentSelected={this.changeCurrentSelected}
					firebase={firebase}
					user={user}
					joinedServers={joinedServers}
				/>
				{server !== null ? (
					<Channels
						selectedServer={joinedServers[server]}
						selectedChannel={channel}
						removeServer={removeServer}
						uid={user.uid}
						changeCurrentSelected={this.changeCurrentSelected}
						userRole={role}
					/>
				) : (
					<UserPannel
						changeCurrentSelected={this.changeCurrentSelected}
						selectedDM={selectedDM}
						dms={dms}
						userUid={user.uid}
					/>
				)}
				{server ? (
					<div className="messages-wrapper">
						<Messages
							server={joinedServers[server]}
							messages={this.getMessages(messages)}
							channel={channel}
							headerName={"# " + channel.name}
							user={user}
							userRole={role}
							roles={roles}
						/>
						<ServerUsers roles={roles} users={joinedServers[server].users} />
					</div>
				) : extra.includes(selectedDM) ? (
					<Extra extra={selectedDM} />
				) : (
					<div className="messages-wrapper">
						<Messages
							dm={{ ...dms[dm], id: dm }}
							headerName={
								"@ " +
								(dms[dm].user1.uid === user.uid
									? dms[dm].user2.name
									: dms[dm].user1.name)
							}
							user={user}
							startAudioCall={this.startAudioCall}
						/>
					</div>
				)}
				{this.state.audioRemoteStream ? (
					<audio src={this.state.audioRemoteStream}></audio>
				) : null}
			</div>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return {
		removeServer: id => dispatch(removeServer(id)),
		selectServer: id => dispatch(selectServer(id))
	};
}

function mapStateToProps(state) {
	return {
		user: state.user.user,
		joinedServers: state.server.joinedServers,
		messages: state.server.messages,
		server: state.server.server,
		channel: state.server.channel,
		selectedDM: state.server.dm,
		role: state.server.role,
		roles: state.server.roles,
		dms: state.server.dms,
		dm: state.server.dm,
		call: state.server.call
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Discord);
