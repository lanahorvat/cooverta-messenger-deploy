import React, { useContext, useState } from "react";
import ChatContext from "../context/ChatContext";

function Message() {
  const { publishMessage } = useContext(ChatContext);

  const [message, setMessage] = useState("");

  function sendMessage(e) {
    e.preventDefault();
    if (message && message.replace(/\s/g, "").length > 0) {
      publishMessage(message);
      setMessage("");
    }
  }

  return (
    <div className="input">
        <form className="input-form" onSubmit={sendMessage}>
            <input
                className="input-box"
                type="text"
                placeholder="Write message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
            />
        </form>
        <button className="send" onClick={sendMessage}>Send</button>
    </div>
);
}

export default Message;