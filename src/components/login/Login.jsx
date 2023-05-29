import React, { useContext, useState } from "react";
import UserContext from "../context/UserContext";
import Pidgeon from "../../assets/Pidgeon.png"

  function Login() {
  const [username, setUsername] = useState(null);
  const [error, setError] = useState("");

  const { onUserLogin } = useContext(UserContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !username.replace(/\s/g, "").length) {
      setError("Please choose a username.");
    } else {
      setError(null);
      onUserLogin(username);
    }
  };

  return (
    <div className="login">
      <div className="login-wrapper">
        <span className="logo">Cooverta Messenger</span>
        <span><img src={Pidgeon} alt="Cooverta Chat Logo" width="150px" /></span>
        <span className="title">Login</span>
        <form onSubmit={handleSubmit}>
          <input placeholder="Choose a username" type="text" maxLength="16" onChange={(e) => setUsername(e.target.value)} />
          <div className="error-message">{error}</div>
          <button type="submit" className="login-button">Enter chat</button>
        </form>
      </div>
    </div>
  );
};

export default Login;