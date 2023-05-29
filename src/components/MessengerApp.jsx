import React, { useState } from "react";
import Login from "./login/Login";
import Chat from "./chat/Chat";
import UserContext from "./context/UserContext";

const CHANNEL_ID = "6SWqo99YOW20cgH8";

function MessengerApp() {
  const [user, setUser] = useState("");
  const [drone, setDrone] = useState(null);

  function onUserLogin(username) {
    if (username) {
      const drone = new window.Scaledrone(CHANNEL_ID, {
        data: { username},
      });
      drone.on("open", () => {
        setDrone(drone);
        setUser({ id: drone.clientId, username });
      });
    }
  }

  function userLogout() {
    drone.close();
    setDrone(null);
    setUser(null);
  }

  return (
    <div>
      <UserContext.Provider value={{ user, drone, onUserLogin, userLogout }}>
        {!user && <Login />}
        {user && <Chat />}
      </UserContext.Provider>
    </div>
  );
}

export default MessengerApp;