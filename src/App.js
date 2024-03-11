import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import M from "materialize-css";
import Home from "./pages/HomeNew";
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
import Notification from "./Notification/Notification";
import TestFolder from "./TEST/test";
import ChatMessage from "./ChatBot/ChatMessage";
import Swal from "sweetalert2";

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
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://followers-ba029-default-rtdb.firebaseio.com/entries.json');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (data && Object.keys(data).length > previousDataLength) {
          previousDataLength = Object.keys(data).length;
          
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Initial fetch
    fetchData();

    const interval = setInterval(fetchData, 1000);

    return () => clearInterval(interval); // Cleanup
  }, []);

  let previousDataLength = 0;

  // -----------------------Modal-----------------
  useEffect(() => {
    const options = {
      // Add your modal options here
    };
    const modal = document.querySelectorAll('.modal');
    M.Modal.init(modal, options);
  }, []);
// ----------------------Full screen prompt--------------------------------------------

  // const [isFullscreen, setIsFullscreen] = useState(false);
  // useEffect(() => {
  //   const fullscreenPromptShown = localStorage.getItem('fullscreenPromptShown');
  //   Swal.fire({
  //     title: 'Better Experience',
  //     text: 'Do you want to enter fullscreen mode?',
  //     icon: 'question',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No',
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       document.documentElement.requestFullscreen().then(() => {
  //         setIsFullscreen(true);
  //         localStorage.setItem('fullscreenPromptShown', 'true');
  //       }).catch((err) => {
  //         console.error('Failed to enter fullscreen mode: ', err);
  //       });
  //     }
  //   });
  // }, []); // Empty dependency array means this effect will only run once, on component mount

  // const handleFullscreenToggle = () => {
  //   // This function remains the same for handling subsequent toggles
  //   if (!document.fullscreenElement) {
  //     document.documentElement.requestFullscreen().then(() => {
  //       setIsFullscreen(true);
  //     }).catch((err) => {
  //       console.error('Failed to enter fullscreen mode: ', err);
  //     });
  //   } else {
  //     document.exitFullscreen().then(() => {
  //       setIsFullscreen(false);
  //     }).catch((err) => {
  //       console.error('Failed to exit fullscreen mode: ', err);
  //     });
  //   }
  // };
  return (
    <>
      <Router>
        <div className="header">
          {/* Render Header Component */}
          <Header />
        </div>
        <div className="fixed-action-btn">
          <button className="btn btn-large btn-floating amber waves-effect waves-light">
            <i className="large material-icons waves-effect waves-light modal-trigger" href="#modal1">message</i>
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
            <Route exact path="/Notification" element={<Notification />} />            
            <Route exact path="/test" element={<TestFolder />} />
            {/* Add routes for AdminDashboard and UserDashboard here */}
          </Routes>
        </div>
        {/* Rest of your code */}
         {/* Modal Structure */}
      <div id="modal1" className="modal">
        <ChatMessage/>
      </div>
      </Router>
    </>
  );
}

export default App;
