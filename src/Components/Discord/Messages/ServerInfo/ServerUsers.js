import React from "react";
import User from "./User";
import { connect } from "react-redux";

const ServerUsers = props => {
  const displayUsers = (_roles, users) => {
    const roles = { ..._roles };
    Object.keys(users).map(_user => {
      const user = users[_user];
      if (user.role === "normal") {
        if (user.presence) {
          if (!roles["online"]) {
            roles["online"] = {};
            roles["online"].users = {};
            roles["online"].users[_user] = user;
          }
        } else {
          if (!roles["offline"]) {
            roles["offline"] = {};
            roles["offline"].users = {};
            roles["offline"].users[_user] = user;
          }
        }
      } else {
        if (!roles[user.role].users) roles[user.role].users = {};
        roles[user.role].users[_user] = user;
      }
    });

    return Object.keys(roles).map(role =>
      roles[role].users ? (
        <div key={role} className="category-container">
          <div className="category">{role}</div>
          {roles[role].users
            ? Object.keys(roles[role].users).map(user => {
                return (
                  <User
                    key={user}
                    user={roles[role].users[user]}
                    color={roles[role].color}
                  />
                );
              })
            : null}
        </div>
      ) : null
    );
  };

  return (
    <div className="server-users">{displayUsers(props.roles, props.users)}</div>
  );
};

function mapStateToProps(state) {
  return {
    user: state.user.user,
    joinedServers: state.server.joinedServers
  };
}

export default connect(mapStateToProps)(ServerUsers);
