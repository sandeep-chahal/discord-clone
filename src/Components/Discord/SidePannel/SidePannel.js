import React from "react";
import Server, { Switch, Add } from "./Server";
import "./SidePannel.scss";
import AddModal from "../AddModal/AddModal";
import uuidv4 from "uuid/v4";

class SidePannel extends React.Component {
	state = {
		showModal: false,
		percentage: 0,
		createStatus: ""
	};

	serverRef = this.props.firebase.database().ref("servers");
	storage = this.props.firebase.storage().ref("serversIcon");

	handleCreateServer = (name, file) => {
		this.setState({ createStatus: "prepairing" });

		//first we gonna upload the icon
		this.uploadFile(file, name);
		//after icon uploaded its gonna call createServer with url
	};
	uploadFile = (file, name) => {
		const path = uuidv4(); //generate unique filename
		const task = this.storage.child(path + ".jpg").put(file); //upload it to storage

		//add event event listner(task.on(1,2,3,4)) to check the upload status and get download url after upload done
		// task.on accepts 4 args =>  1."event name", 2."snap on every change", 3."error", 4."done"
		task.on(
			"state_changed", //1. event name
			snap => {
				//2. snap on every change
				var percentage =
					Math.round(snap.bytesTransferred / snap.totalBytes) * 100;
				this.setState({ percentage, createStatus: "uploading icon..." });
			},
			err => console.log(err.message), //3. errors
			() => {
				//4. when upload is done
				//get url of icon
				task.snapshot.ref.getDownloadURL().then(url => {
					this.setState({ createStatus: "uploaded" });
					this.createServer(name, url); //create server after icon uploaded
				});
			}
		);
	};

	createServer = (name, url) => {
		this.setState({ createStatus: "creating Server" });
		//create server in database with url and name
		const key = this.serverRef.push().getKey();
		this.serverRef
			.child(key)
			.set({
				name,
				url,
				id: key,
				roles: {
					admin: {
						isAdmin: true,
						color: "#ff1f5a",
						name: "admin"
					},
					normal: {
						isAdmin: false,
						color: "#ccc",
						name: "normal"
					}
				},
				users: {
					[this.props.user.uid]: {
						name: this.props.user.displayName,
						uid: this.props.user.uid,
						role: "admin",
						photo: this.props.user.photoURL
					}
				},
				category: {
					general: {
						name: "general",
						channels: [{ name: "general", type: "text", categoryID: "general" }]
					}
				}
			})
			.then(() => {
				this.setState({ createStatus: "adding server" });
				this.addServer(key);
			})
			.catch(err => console.log(err));
	};

	//added created server to user data
	addServer = id => {
		this.props.firebase
			.database()
			.ref("users")
			.child(`${this.props.user.uid}/servers/${id}`)
			.set({
				id
			})
			.then(() => {
				this.setState({
					createStatus: "",
					showModal: false
				});
			});
	};

	displayServers = servers => {
		const keys = Object.keys(servers);
		return keys.map(key => (
			<Server
				active={key === this.props.selectedServer}
				key={key}
				url={servers[key].url || ""}
				onClick={() => {
					this.props.changeCurrentSelected({
						server: key
					});
				}}
			/>
		));
	};

	render() {
		const { selectedServer, joinedServers } = this.props;
		return (
			<div className="sidepannel">
				<Switch
					active={selectedServer === null}
					url="https://i.imgur.com/qMgJs45.png"
					onClick={() => {
						this.props.changeCurrentSelected({
							server: null
						});
					}}
				/>
				<div className="underline"></div>

				{/* display joined servers */}
				{joinedServers ? this.displayServers(joinedServers) : null}

				<Add
					onClick={() => this.setState({ showModal: true })}
					url="https://cdn3.iconfinder.com/data/icons/stroke/53/Button-512.png"
				/>
				{this.state.showModal ? (
					<AddModal
						create="Server"
						show={this.setState.showModal}
						onClick={this.handleCreateServer}
						handleClose={() => this.setState({ showModal: false })}
						status={this.state.createStatus}
						percentage={this.state.percentage}
					/>
				) : null}
			</div>
		);
	}
}

export default SidePannel;
