import React, { useState } from "react";

const MessageForm = props => {
  const [message, setMessage] = useState("");

  return (
    <div className="messageform">
      <div className="file">
        <label htmlFor="file">+</label>
        <input type="file" id="file" />
      </div>

      <form>
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="#message"
        />
      </form>
    </div>
  );
};

export default MessageForm;
