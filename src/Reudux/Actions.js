import * as actionTypes from "./actionTypes";
import firebase from "../firebase";

// store user in store
export const login = user => {
	return {
		type: actionTypes.LOGIN,
		payload: { user }
	};
};

// servers list that user ahs joined
// export const addJoinedServers = server => {
//   return {
//     type: actionTypes.ADD_JOINED_SERVER,
//     payload: server
//   };
// };
export const setServerLoading = isLoading => {
	return {
		type: actionTypes.SET_SERVER_LOADING,
		payload: isLoading
	};
};

//total server list on platform,includes joined servers and nonjoined severs
const addTotalServers = servers => {
	return {
		type: actionTypes.ADD_TOTAL_SERVER,
		payload: servers
	};
};

// // loading total server list or not
// const setLoadingTotalServer = isLoading => {
//   return {
//     type: actionTypes.SET_LOADING_TOTAL_SERVERS,
//     payload: isLoading
//   };
// };

export const selectServer = server => {
	return {
		type: actionTypes.SELECT_SERVER,
		payload: server
	};
};

// async func to load total servers from db
export const loadTotalServers = () => {
	return dispatch => {
		firebase
			.database()
			.ref("servers")
			.once("value", snap => {
				const servers = convertToArray(snap.val());
				dispatch(addTotalServers(servers));
			});
	};
};

export const updateServer = (id, server) => {
	return {
		type: actionTypes.UPDATE_SERVER,
		payload: {
			id,
			server
		}
	};
};
export const addDm = (id, dms) => {
	return {
		type: actionTypes.ADD_DM,
		payload: {
			id,
			dms
		}
	};
};

export const removeServer = id => {
	return {
		type: actionTypes.REMOVE_SERVER,
		payload: id
	};
};
export const addMessages = (serverId, channels) => {
	return {
		type: actionTypes.ADD_MESSAGES,
		payload: {
			serverId,
			channels
		}
	};
};

export const setCall = call => {
	return {
		type: actionTypes.SET_CALL,
		payload: call
	};
};

// //loading single server
// export const loadServer = id => {
//   const db = firebase.database();
//   console.log("loaded single server");

//   return dispatch => {
//     db.ref("servers/" + id).once("value", snap => {
//       dispatch(addJoinedServers(snap.val()));
//     });
//   };
// };

// // async func to load all joined servers from db
// // first we are fetch all the servers id's from user data after that
// //we are fetching individual server data using id's from servers ref
// export const loadJoinedServers = uid => {
//   console.clear();
//   console.log("loaded all servers");

//   return dispatch => {
//     const db = firebase.database();
//     db.ref("users/" + uid + "/servers").once("value", snap => {
//       const joinedServers = convertToArray(snap.val());
//       const servers = [];
//       joinedServers.forEach(server => {
//         db.ref("servers/" + server.id).once("value", snap => {
//           servers.push(snap.val());

//           if (servers.length === joinedServers.length) {
//             const filtered = filterServers(servers, joinedServers, uid);
//             dispatch(addJoinedServers(filtered));
//           }
//         });
//       });
//     });
//   };
// };

//convert db object to array before storing
const convertToArray = servers => {
	if (servers === null) return [];
	const keys = Object.keys(servers);
	return keys.map(key => servers[key]);
};

// //checking if the server is deleted, if yes then removing from users db
// const filterServers = (filterables, servers, uid) => {
//   if (Array.isArray(filterables)) {
//     return filterables.filter((server, index) =>
//       !server ? removeDeletedServer(uid, servers[index].id) : server
//     );
//   } else return [];
// };

// //remove server from user db
// export const removeDeletedServer = (uid, id) => {
//   firebase
//     .database()
//     .ref("users/" + uid + "/servers/")
//     .child(id)
//     .remove();
// };
