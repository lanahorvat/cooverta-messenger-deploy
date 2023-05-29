import React, { useContext } from "react";
import ChatContext from "../context/ChatContext";

 function Header() {
  const { onClickLogout, user } = useContext(ChatContext);

  return (
    <div className="header">
      <div>
        <div className="header-title">Hello, {user.username}!</div>
      </div>
        <button onClick={onClickLogout} type="submit">
          Logout
        </button>
    </div>
  );
}

export default Header;