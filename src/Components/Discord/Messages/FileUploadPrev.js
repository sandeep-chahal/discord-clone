import React from "react";

const FileUploadPrev = ({ file, closeModal, sendFile, percentage }) => {
  const handleClose = e => {
    if (e.target.classList[0] === "fileuploadmodalbg") closeModal();
  };

  return (
    <div className="fileuploadmodalbg" onClick={handleClose}>
      <div className="fileuploadmodal">
        <h2>Upload File</h2>
        <label
          htmlFor="file"
          className="fileprev"
          style={{
            backgroundImage: `url(${URL.createObjectURL(file)})`
          }}
        ></label>
        {percentage ? (
          <div className="percentage">{percentage}</div>
        ) : (
          <div className="btngrp">
            <div className="cancelbtn" onClick={closeModal}>
              Cancel
            </div>
            <div className="sendbtn" onClick={sendFile}>
              Send
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FileUploadPrev;
