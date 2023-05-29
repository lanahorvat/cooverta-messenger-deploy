import React, { useContext } from "react";
import ChatContext from "../context/ChatContext";

 function Users() {
  const { membersArray } = useContext(ChatContext);

  return (
    <div>
      <div className="users-title"><div className="online-circle"></div> Online users</div>
      {membersArray.map((member) => (
        <div className="member" key={member.id}>
          <span className="username">
            {member.clientData.username}
          </span>
        </div>
      ))}
    </div>
  );
}

export default Users;
