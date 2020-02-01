import React from "react";

const User = ({ user, color }) => {
  return (
    <div className="user" style={{ opacity: user.presence ? "1" : "0.7" }}>
      <div
        className="user-icon"
        style={{ backgroundImage: `url(${user.photo})` }}
      >
        <div
          className="presence"
          style={{
            backgroundColor: user.presence ? "var(--green-2)" : "",
            display: user.presence ? "block" : "none"
          }}
        ></div>
      </div>
      <div className="name" style={{ color: color }}>
        {user.name}
      </div>
    </div>
  );
};

export default User;
