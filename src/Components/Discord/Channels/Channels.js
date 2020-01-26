import React, { useState } from "react";
import "./Channels.scss";
import Channel from "./Channel";

const Channels = props => {
  const [showDropdown, setDropdown] = useState(true);

  const dropdown = (
    <div className="dropdown">
      <div className="item invite" onClick={getInviteLink}>
        Invite
      </div>
      <div className="item" onClick={createChannel}>
        create channel
      </div>
      <div className="item" onClick={createCategory}>
        create category
      </div>
      {props.uid !== props.selectedServer.admin.uid ? (
        <div className="item leave" onClick={leaveServer}>
          leave server
        </div>
      ) : (
        <div className="item delete" onClick={deleteServer}>
          delete server
        </div>
      )}
    </div>
  );

  return (
    <div className="channels">
      <header>
        {props.selectedServer.name}
        <span className="arrow"></span>
      </header>
      {showDropdown ? dropdown : null}
      <div className="underline"></div>
      {props.selectedServer.channels.map((channel, index) => {
        return <Channel channel={channel} key={channel.name + index} />;
      })}
    </div>
  );
};

export default Channels;
