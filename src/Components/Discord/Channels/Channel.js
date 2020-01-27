import React from "react";

const Channel = ({ channel, id, onClick, active }) => {
  return (
    <div
      className={active ? "active channel" : "channel"}
      onClick={() => onClick(id)}
    >
      {channel.type === "text" ? <span>#</span> : null} {channel.name}
    </div>
  );
};

export default Channel;
