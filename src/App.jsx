import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./style.scss";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { currentUser } = useContext(AuthContext);

  //protected route
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      console.log(currentUser);

      return <Navigate to={"/"} />;
    } else {
      return children;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
}

export default App;
