import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import M from "materialize-css";
import Home from "./pages/Home";
import About from "./components/Profile";
import Contact from "./pages/Contact";
import Header from "./Header"; // Import Header component
import "./App.css";
import Admin from "./pages/Admin";
import NoPage from "./pages/NoPage";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import { auth } from "./firebase";
import ChatBot from "./components/ChatBot";
import Test from "./components/Users";
import Fake from "./Fake";
import ProfileCard from "./ProfileCard";
import MessageViewer from "./Messages";
import Dashboard from "./components/Dashboard/Dashboard";
import RedirectPage from './Portfolio'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("");
  const [showPopup, setShowPopup] = useState(true); // State to control popup display

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
        // Hide the popup after user authentication
        setShowPopup(false);
      } else {
        setUserName("");
        // Show the popup when user is not authenticated
        setShowPopup(true);
      }
    });

    // Initialize Materialize modal
    const modal = document.querySelectorAll(".modal");
    M.Modal.init(modal);
  }, []);

  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
  };

  return (
    <>
      <Router>
        <div className="header">
          {/* Render Header Component */}
          <Header />
        </div>
        {showPopup && ( // Conditionally render the popup
          <div id="modal1" className="modal">
            <div className="modal-content">
              <h4>Welcome!</h4>
              <p>Please login to continue.</p>
            </div>
            <div className="modal-footer">
              <button className="modal-close waves-effect waves-green btn-flat">
                Close
              </button>
            </div>
          </div>
        )}
        <div className="fixed-action-btn">
          <button className="btn btn-large btn-floating amber waves-effect waves-light">
            <i className="large material-icons">message</i>
          </button>
        </div>
        {/* Define Routes */}
        <div className="main">
          <Routes>
            {/* <Route exact path="/" element={<Home />} /> */}
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
            <Route exact path="*" element={<NoPage />} />
            <Route exact path="Admin" element={<Admin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/" element={<Home name={userName} />} />
            <Route exact path="/bot" element={<ChatBot />} />
            <Route exact path="/Chat" element={<Test />} />
            <Route exact path="/Fake" element={<Fake />} />
            <Route exact path="/Messages" element={<MessageViewer />} />
            <Route exact path="/Dashboard" element={<Dashboard />} />
            <Route exact path="/Portfolio" element={<RedirectPage />} />
            {/* Add routes for AdminDashboard and UserDashboard here */}
          </Routes>
        </div>
        {/* Rest of your code */}
      </Router>
    </>
  );
}

export default App;
