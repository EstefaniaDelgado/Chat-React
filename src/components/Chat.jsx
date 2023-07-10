import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from "../context/ChatContext";

function Chat() {
  
  const { data } = useContext(ChatContext);
 

  return (
    <div className="chat">
      <div className="chatInfo">
        <img src={data.user?.photoURL} alt="photo-user" />
        <span>{data.user?.displayName}</span>
        <div className="chatIcons">
          <i className="large material-icons">camera_alt</i>
          <i className="large material-icons"> person_add</i>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
}

export default Chat;
