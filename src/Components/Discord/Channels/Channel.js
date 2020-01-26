import React from "react";

const Channel = ({ channel }) => {
  return (
    <div className="channel" onClick={() => console.log(channel.name)}>
      {channel.type === "text" ? <span>#</span> : null} {channel.name}
    </div>
  );
};

export default Channel;
