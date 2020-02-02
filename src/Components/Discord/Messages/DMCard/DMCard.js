import React, { useState } from "react";
import "./DMCard.scss";
import firebase from "../../../../firebase";

const DMCard = ({ photo, name, uid, role, roleColor, close }) => {
  const [message, setMessage] = useState("");
  const userUid = firebase.auth().currentUser.uid;

  const handleSubmit = e => {
    if (e.key === "Enter") {
      const path = userUid < uid ? userUid + uid : uid + userUid;
      firebase
        .database()
        .ref("messages")
        .child("dm")
        .child(path)
        .once("value", snap => {
          if (snap.val()) {
            firebase
              .database()
              .ref("messages")
              .child(path)
              .child("messages")
              .push({
                text: message
              });
          } else {
            firebase
              .database()
              .ref("messages")
              .child(path)
              .set({
                user1: userUid,
                user2: uid,
                messages: {
                  0: {
                    text: message
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
              .child(userUid)
              .child("dm")
              .child(path)
              .set(path);
          }
        });
      setMessage("");
      close();
    }
  };
  return (
    <div className="dmcard" onMouseLeave={close}>
      <div className="dmcard-header">
        <div
          className="userPhoto"
          style={{ backgroundImage: `url(${photo})` }}
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
      {userUid !== uid ? (
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
