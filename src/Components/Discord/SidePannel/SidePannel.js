import React, { useState } from "react";
import Server, { Switch, Add } from "./Server";
import "./SidePannel.scss";
import AddModal from "../AddModal/AddModal";

const SidePannel = ({ firebase }) => {
  const [showModal, setShowModal] = useState(false);

  const createServer = (name, file) => {
    firebase
      .database()
      .ref("servers")
      .push()
      .set({
        name
      })
      .then(() => console.log("yahoooooooo!"))
      .catch(err => console.log(err));
  };

  return (
    <div className="sidepannel">
      <Switch url="https://i.imgur.com/qMgJs45.png" />
      <div className="underline"></div>
      {
        // servers
      }
      <Add
        onClick={() => setShowModal(true)}
        url="https://cdn3.iconfinder.com/data/icons/stroke/53/Button-512.png"
      />
      {showModal ? (
        <AddModal
          server
          show={showModal}
          createServer={createServer}
          handleClose={() => setShowModal(false)}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SidePannel;
