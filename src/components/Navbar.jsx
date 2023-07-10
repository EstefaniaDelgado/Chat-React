import React, { useContext } from "react";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar">
      <span className="logo">Chat</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="photo-user" />
        <span>
          {currentUser.displayName}
        </span>
        <button onClick={() => signOut(auth)}>Log out</button>
      </div>
    </div>
  );
}

export default Navbar;
