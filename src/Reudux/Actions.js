import * as actionTypes from "./actionTypes";
import firebase from "../firebase";

// store user in store
export const login = user => {
  return {
    type: actionTypes.LOGIN,
    payload: { user }
  };
};

// wait untill we know if user has logged in or not
export const setUserLoading = isLoading => {
  return {
    type: actionTypes.SET_USER_LOADING,
    payload: isLoading
  };
};

// servers list that user ahs joined
export const addJoinedServers = server => {
  return {
    type: actionTypes.ADD_JOINED_SERVER,
    payload: server
  };
};

//total server list on platform,includes joined servers and nonjoined severs
const addTotalServers = servers => {
  return {
    type: actionTypes.ADD_TOTAL_SERVER,
    payload: servers
  };
};

// loading total server list or not
const setLoadingTotalServer = isLoading => {
  return {
    type: actionTypes.SET_LOADING_TOTAL_SERVERS,
    payload: isLoading
  };
};

// async func to load total servers from db
export const loadTotalServers = () => {
  return dispatch => {
    dispatch(setLoadingTotalServer(true));
    firebase
      .database()
      .ref("servers")
      .once("value", snap => {
        const servers = convertToArray(snap.val());
        dispatch(addTotalServers(servers));
      });
  };
};

//loading single servers async
export const loadServer = id => {
  const db = firebase.database();
  console.log("loaded single server");

  return dispatch => {
    db.ref("servers/" + id).once("value", snap => {
      dispatch(addJoinedServers(snap.val()));
    });
  };
};

// async func to load all joined servers from db
// first we are fetch all the servers id's from user data after that
//we are fetching individual server data using id's from servers ref
export const loadJoinedServers = uid => {
  console.clear();
  console.log("loaded all servers");

  return dispatch => {
    const db = firebase.database();
    db.ref("users/" + uid + "/servers").once("value", snap => {
      const joinedServers = convertToArray(snap.val());
      const servers = [];
      joinedServers.forEach(server => {
        db.ref("servers/" + server.id).once("value", snap => {
          servers.push(snap.val());
          if (servers.length === joinedServers.length) {
            const filtered = filterExists(servers, joinedServers, uid);
            dispatch(addJoinedServers(filtered));
          }
        });
      });
    });
  };
};
//convert db object to array before storing
const convertToArray = servers => {
  if (servers === null) return [];
  const keys = Object.keys(servers);
  return keys.map(key => servers[key]);
};

const filterExists = (filterables, servers, uid) => {
  if (Array.isArray(filterables)) {
    return filterables.filter((server, index) =>
      !server ? removeDeletedServer(uid, servers[index].id) : server
    );
  } else return [];
};

const removeDeletedServer = (uid, id) => {
  firebase
    .database()
    .ref("users/" + uid + "/servers/")
    .child(id)
    .remove();
};
