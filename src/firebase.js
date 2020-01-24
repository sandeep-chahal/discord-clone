import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: "AIzaSyCmjQ-QuDiTXe3YBU7zJQl0g5q-_mPt9UY",
  authDomain: "discord-clone-66d9a.firebaseapp.com",
  databaseURL: "https://discord-clone-66d9a.firebaseio.com",
  projectId: "discord-clone-66d9a",
  storageBucket: "discord-clone-66d9a.appspot.com",
  messagingSenderId: "265446087212",
  appId: "1:265446087212:web:392811aa65680282680f89",
  measurementId: "G-XQPC1S7QLC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
