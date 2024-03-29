import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

function Message({ message }) {
  
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt="share-picture"
        />

        <span>Just now</span>
      </div>
      <div className="messageContent">
        {message.text ? <p>{message.text }</p> : null} 
        {message.img && <img src={message.img} alt="share-picture" style={{height:"200px", width:"200px", objectFit:"contain"}}/>}
      </div>
    </div>
  );
}

export default Message;
