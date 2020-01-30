import React from "react";
import TotalServers from "../UserPannel/TotalServers/TotalServers";

const Extra = ({ extra }) => {
  switch (extra) {
    case "totalServers":
      return <TotalServers />;
    default:
      return <div>We don't have that yet</div>;
  }
};

export default Extra;
