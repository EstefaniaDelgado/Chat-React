import React from "react";
import Sidebar from "../components/Sidebar";
import Chat from "../components/Chat";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Home() {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
