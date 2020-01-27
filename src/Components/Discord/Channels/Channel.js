import React from "react";

const Channel = ({ channel, id }) => {
  return (
    <div className="channel" onClick={() => console.log(id)}>
      {channel.type === "text" ? <span>#</span> : null} {channel.name}
    </div>
  );
};

export default Channel;
