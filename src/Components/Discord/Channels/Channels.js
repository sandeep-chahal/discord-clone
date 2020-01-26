import React from "react";
import "./Channels.scss";
import Channel from "./Channel";

const Channels = props => {
  return (
    <div className="channels">
      <header>
        {props.selectedServer.name}
        <span className="arrow"></span>
      </header>
      <div className="underline"></div>
      {props.selectedServer.channels.map((channel, index) => {
        return <Channel channel={channel} key={channel.name + index} />;
      })}
    </div>
  );
};

export default Channels;
