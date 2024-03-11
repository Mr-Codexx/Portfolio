import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import './Header.css'
import { logout } from "./auth"; // Import the logout function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Bell from './components/Bell';

const Header = ({ isLoggedIn, role, handleLogin }) => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const notificationCount = 3;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            // console.log(user)
            if (user) {
                // User is logged in
                setUserName(user.displayName);
                // Extract email domain
                const emailParts = user.email.split('@');
                if (emailParts.length === 2) {
                    const domain = emailParts[1];
                    // console.log('Email Domain:', domain);
                    if (domain === 'prolifics.com') {
                        // alert('You are working in Prolifics')
                    }
                } else {
                    console.error('Invalid email address:', user.email);
                }
            } else {
                // User is logged out
                setUserName("");
            }
        });

        // Initialize MaterializeCSS side navigation for mobile
        const sideNav = document.querySelector('.sidenav');
        window.M.Sidenav.init(sideNav, {});

        return () => {
            unsubscribe();
        };
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };
    // _____Full Screen_______________________________________________________
    const handleSwitchToggle = () => {
        setIsFullScreen(!isFullScreen);
        if (!isFullScreen) {
            openFullscreen();
        } else {
            closeFullscreen();
        }
    };

    const openFullscreen = () => {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            // For Safari
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            // For IE
            elem.msRequestFullscreen();
        }
    };

    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            // For Safari
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            // For IE
            document.msExitFullscreen();
        }
    };
    const isSachin = userName === "SuperUser" || userName === "Sachin Sharma";
    return (
        <header className="nav-extended navbar-fixed">
            <nav className="nav-wrapper row deep-purple darken-3">
                <div className="col s12">
                    <ul className="nav-content navbar left hide-on-med-and-down"> {/* Hide on medium and small devices */}

                    <li>
        <NavLink exact to="/" className="btn nav-link" activeClassName="active">
          <i className="material-icons">home</i>
          <span>Home</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/about" className="btn nav-link" activeClassName="active">
          <i className="material-icons">info</i>
          <span>About Me</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/contact" className="btn nav-link" activeClassName="active">
          <i className="material-icons">email</i>
          <span>Contact</span>
        </NavLink>
      </li>
      <li>
        <NavLink to="/Chat" className="btn nav-link" activeClassName="active">
          <i className="material-icons">chat</i>
          <span>Chat</span>
        </NavLink>
      </li>

                        <li>
                            <div className="switch">
                                <label>
                                    Off
                                    <input type="checkbox" checked={isFullScreen} onChange={handleSwitchToggle} />
                                    <span className="lever"></span>
                                    On
                                </label>
                            </div>
                        </li>
                        {/* <li><Link to="/contact" className="nav-link">Contact Us</Link></li> */}
                        {/* Conditionally render admin dashboard link based on role */}
                        {isSachin && (
                            <li><Link to="/Dashboard" className="btn nav-link">Admin Dashboard</Link></li>
                        )}
                    </ul>

                    <ul className="sidenav" id="mobile-nav"> {/* For mobile navigation */}
                        <li className="sidebar-logo"><h2>Sachin</h2></li>
                        <li><Link to="/" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}><i className="material-icons white-text">home</i> Home</Link></li>
                        <li><Link to="/about" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}><i className="material-icons white-text">info</i> About Me</Link></li>
                        <li><Link to="/contact" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}><i className="material-icons white-text">contacts</i> Contact</Link></li>
                        <li><Link to="/Chat" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}><i className="material-icons white-text">chat</i> Chat</Link></li>
                        {isSachin && (
                            <li><Link to="/Dashboard" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}><i className="material-icons white-text">dashboard</i> Admin Dashboard</Link></li>
                        )}
                    </ul>


                    <a href="#" data-target="mobile-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>

                    <ul className="right pulse" >

                        <Bell count={notificationCount} />
                        <span><img className=" userIcon" src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png" />
                            <b className="userName">{userName} </b></span>
                        <li className="right">
                            {/* Conditionally render login or logout button based on isLoggedIn state */}
                            {userName ? (
                                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>

                            ) : (
                                <button className="btn btn-danger" type="button" data-toggle="btn " aria-expanded="false" onClick={handleLogin}>
                                    <Link to="/Login">Login</Link>
                                </button>
                            )}
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
