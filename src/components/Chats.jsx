import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { ChatContext } from '../context/ChatContext';
import OptionsChat from './OptionsChat';


function Chats() {

  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);

  const { data } = useContext(ChatContext);

  const { currentUser } = useContext(AuthContext);

  const { dispatch } = useContext(ChatContext);


  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
        setChats(doc.data());
      });
      return () => {
        unsub();
      };
    };
    currentUser.uid && getChats();
  }, [currentUser.uid]);


  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });
    return () => {
      unSub();
    };
  }, [data.chatId]);
 

  const handleSelect = (user) => {
    dispatch({ type: 'CHANGE_USER', payload: user });
  };


  return (
    <div className="chats">
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat) => (
            <div className='containerChats' key={chat[0]}>
            <div
              className="userChats"
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo?.photoURL} alt="photo-user" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo?.displayName[0].toUpperCase() + chat[1].userInfo.displayName.slice(1) }</span>
                <p>{ messages.length ? chat[1].lastMessage?.text.slice(0,10) : null}</p>
              </div>
              </div>
              <OptionsChat />
            </div>
          ))}

      
    </div>
  );
}

export default Chats;
