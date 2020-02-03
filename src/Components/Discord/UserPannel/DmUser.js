import React from "react";

const DmUser = props => {
  return (
    <div
      className={props.active ? "active user" : "user"}
      onClick={props.onClick}
    >
      <div
        className="photo"
        style={{ backgroundImage: `url(${props.photo})` }}
      ></div>
      <div className="name">{props.name}</div>
    </div>
  );
};

export default DmUser;
