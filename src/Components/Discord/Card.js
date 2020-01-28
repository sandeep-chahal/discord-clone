import React from "react";

const Card = props => {
  return (
    <div className="card">
      <div
        className="card-bg"
        style={{ backgroundImage: `url(${props.img})` }}
      ></div>
      <div className="grp">
        <h2>{props.header}</h2>
        <div
          className={props.joined ? "joined-btn btn" : "join-btn btn"}
          onClick={props.onClick}
        >
          {props.joined ? "Joined" : "Join"}
        </div>
      </div>
    </div>
  );
};

export default Card;
