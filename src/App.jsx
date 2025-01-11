import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ForgotPassword from "./components/ForgotPassword";
import VerifyEmail from "./components/VerifyEmail";
import PasswordReset from "./components/PasswordReset";
import { Toaster } from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";

const App = () => {
  const {accessToken} = useSelector((state) => state.auth);

  return (
    <Router>
      <div>
        <Navbar />
        <Toaster position="top-center" />
        <Routes>
          <Route
            path="/login"
            element={accessToken ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={accessToken ? <Navigate to="/" /> : <Register />}
          />
          <Route
            path="/forgot-password"
            element={accessToken ? <Navigate to="/" /> : <ForgotPassword />}
          />
          <Route
            path="/verify-email/:uid/:token"
            element={accessToken ? <Navigate to="/" /> : <VerifyEmail />}
          />
          <Route
            path="/reset-password/:uid/:token"
            element={accessToken ? <Navigate to="/" /> : <PasswordReset />}
          />

          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
