import React, { useContext, useEffect, useRef } from "react";
import ChatContext from "../context/ChatContext";
import UserContext from "../context/UserContext";

const Messages = () => {
  const { messageArray } = useContext(ChatContext);
  const { user } = useContext(UserContext);
  const bottomRef = useRef();

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ block: "end", behavior: "smooth" });
    }
  }, [messageArray]);

  return (
    <section>
      <ul>
        {messageArray.map((m) => {
          let messageContent = "";
          let usernameDisplay = "";
          let className = "";

          if (m.type === "MEMBER_JOINED" || m.type === "MEMBER_LEFT") {
            messageContent = m.message;
            usernameDisplay = m.user.username;
            className = "enter-exit";
          } else {
            messageContent = m.message;
            usernameDisplay = m.user.username;
            className = user.id === m.user.id ? "my-message" : "others-message";
          }

          return (
            <li key={m.id} className={className}>
              <div className="chat-bubble">
                <span className="chat-username">{usernameDisplay}</span><br />
                <span className="message-content">{messageContent}</span><br />
                <span className="timestamp">{m.time}</span><br />
              </div>
            </li>
          );
        })}
        <div ref={bottomRef}></div>
      </ul>
    </section>
  );
};

export default Messages;