import React, { useState } from "react";
import "./AddModal.scss";
import { getQueriesForElement } from "@testing-library/react";

const AddModal = props => {
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = e => {
    e.preventDefault();
    if (isFormVaild()) {
      props.createServer(name, file);
    } else {
      alert("something wrong");
    }
  };

  const isFormVaild = () => {
    const errors = [];
    if (name.length < 3) errors.push("Name Must be Greater then 2");
    if (!file) errors.push("Please Upload a pic");
    setErrors(errors);
    return errors.length === 0;
  };

  const handleFileChange = e => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
    }
  };
  const handleNameChange = e => {
    const name = e.target.value;
    if (name.length < 15) setName(name);
  };

  const closeModalOnBgClick = e => {
    if (e.target.classList[0] === "bg") props.handleClose(false);
  };

  const fileInput = (
    <div>
      <label htmlFor="file"></label>
      <input
        id="file"
        type="file"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );

  return (
    <div className="bg" onClick={closeModalOnBgClick}>
      <div className="addmodal">
        <h2>
          {props.server ? "Create Another Server!" : "IDK What r u trin to do"}
        </h2>
        <form>
          {props.server ? fileInput : ""}
          <input
            type="text"
            placeholder="Server Name"
            value={name}
            onChange={handleNameChange}
          />
          <div className="button-group">
            <button type="button" onClick={() => props.handleClose(false)}>
              Cancel
            </button>
            <button type="submit" onClick={handleSubmit}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
