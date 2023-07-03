import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { ChatContextProvider } from "./context/ChatContext";

function renderApp() {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthContextProvider>
      <BrowserRouter>
        <ChatContextProvider>
          <React.StrictMode>
            <App />
          </React.StrictMode>
        </ChatContextProvider>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

renderApp();

/* import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext.jsx';
import { ChatContextProvider } from './context/ChatContext.jsx';

ReactDOM.render(
  <AuthContextProvider>
    <ChatContextProvider>
      <BrowserRouter>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </BrowserRouter>
    </ChatContextProvider>
  </AuthContextProvider>,
  document.getElementById('root')
);
 */
