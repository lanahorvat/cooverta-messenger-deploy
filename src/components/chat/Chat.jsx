import React, { useContext, useEffect, useState } from "react";
import ChatContext from "../context/ChatContext";
import UserContext from "../context/UserContext";
import Header from "./Header";
import Messages from "./Messages";
import Users from "./Users";
import Message from "./Message";

const DEFAULT_ROOM_NAME = "observable-default-room";

export default function Chat() {
  const { user, drone, userLogout } = useContext(UserContext);

  const [messageArray, setMessageArray] = useState([]);
  const [membersArray, setMembersArray] = useState([]);

  useEffect(() => {
    if (user) {
      setupRoom(drone);
    }
  }, [user, drone]);

  function setupRoom(scaledrone) {
    scaledrone.on("error", (error) => console.error(error));

    const room = scaledrone.subscribe(DEFAULT_ROOM_NAME);

    room.on("error", (error) => console.error(error));

    room.on("members", function (members) {
      setMembersArray([...members]);
    });

    room.on("member_join", function (member) {
      setMembersArray(function (current) {
        return [...current, member];
      });

      setMessageArray((current) => {
        return [
          ...current,
          {
            message: "has entered the chat.",
            id: Math.random(),
            type: "MEMBER_JOINED",
            user: {
              username: member.clientData.username,
            },
          },
        ];
      });
    });

    room.on("member_leave", function (member) {
      setMembersArray((current) => {
        return current.filter((oneMember) => oneMember.id !== member.id);
      });
      setMessageArray((current) => {
        return [
          ...current,
          {
            message: "has left the chat.",
            id: Math.random(),
            type: "MEMBER_LEFT",
            user: {
              username: member.clientData.username,

            },
          },
        ];
      });
    });

    room.on("message", (message) => {
      setMessageArray((current) => {
        const currentTime = new Date();
        const time = currentTime.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });

        return [
          ...current,
          {
            message: message.data.message,
            id: message.id,
            type: "MESSAGE",
            time: time,
            user: {
              id: message.member.id,
              username: message.member.clientData.username,
            },
          },
        ];
      });
    });
  }

  function publishMessage(message) {
    drone.publish({
      room: DEFAULT_ROOM_NAME,
      message: { message },
    });
  }

  function onClickLogout() {
    userLogout();
  }

  return (
    <div className="chat">
      <ChatContext.Provider
        value={{
          publishMessage,
          onClickLogout,
          messageArray,
          membersArray,
          user,
        }}
      >
        <div className="chat-wrapper">
          <div className="sidebar">
            <div className="logo">
              <img className="logo-img" src="./logo192.png" alt="Cooverta Chat Logo" width="50px" />
              <span className="logo-text">Cooverta Messenger</span>
            </div>
            <div className="active-users"><Users /></div>
          </div>
          <div className="container-right">
            <div className="header"><Header /></div>
            <div className="messages"><Messages /></div>
            <div className="input"><Message /></div>
          </div>
        </div>
      </ChatContext.Provider >
    </div >
  );
}