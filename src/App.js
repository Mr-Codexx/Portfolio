// App.js
import React, { useState, useEffect } from "react";
import './pages/Home.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import Test from "./components/Users"
import './pages/Home.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState("");
  const handleLogin = (role) => {
    setIsLoggedIn(true);
    setRole(role);
  };

  const [userName, setUserName] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserName(user.displayName);
      } else setUserName("");
    });
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setRole("");
  };

  return (
    <>
    <Router>
      <div className="App">
        {/* Render Header Component */}
        <Header/>
      </div>
      <div className="fixed-action-btn">
        <button className="btn btn-large btn-floating amber waves-effect waves-light">
          <i className="large material-icons">message</i>
        </button>
      </div>
      {/* Define Routes */}
      <Routes>
        {/* <Route exact path="/" element={<Home />} /> */}
        <Route exact path="/about" element={<About />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="*" element={<NoPage />}></Route>
        <Route exact path="Admin" element={<Admin />}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Home name={userName} />} />
        <Route exact path="/bot" element={<ChatBot />} />
        <Route exact path="/Chat" element={<ChatBot />} />
        {/* Add routes for AdminDashboard and UserDashboard here */}
      </Routes>
      {/* Rest of your code */}
    </Router>
    </>
  );
}

export default App;