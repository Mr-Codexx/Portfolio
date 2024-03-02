import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import './Header.css'
import { logout } from "./auth"; // Import the logout function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Bell from './components/Bell';

const Header = ({ isLoggedIn, role, handleLogin }) => {
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
                    if(domain === 'prolifics.com'){
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

    const isSachin = userName === "SuperUser" || userName === "Sachin Sharma";
    return (
        <header className="navbar-fixed">
            <nav className="row deep-purple darken-3">
                <div className="col s12">
                    <ul className="left hide-on-med-and-down"> {/* Hide on medium and small devices */}
                        <li><Link to="/" className="btn nav-link">Home</Link></li>
                        <li><Link to="/about" className="btn nav-link">About Me</Link></li>
                        <li><Link to="/contact" className="btn nav-link">Contact Us</Link></li>
                        <li><Link to="/Chat" className="btn nav-link">Chat</Link></li>
                        {/* <li><Link to="/about" className="nav-link">About Me</Link></li>
                        <li><Link to="/contact" className="nav-link">Contact Us</Link></li> */}
                        {/* Conditionally render admin dashboard link based on role */}
                        {isSachin && (
                            <li><Link to="/Admin" className="nav-link">Admin Dashboard</Link></li>
                        )}
                    </ul>

                    <ul className="sidenav" id="mobile-nav"> {/* For mobile navigation */}
                        <li><Link to="/" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>Home</Link></li>
                        <li><Link to="/about" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>About Me</Link></li>
                        <li><Link to="/contact" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>Contact Us</Link></li>
                        <li><Link to="/Chat" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>Chat</Link></li>
                        {isSachin && (
                            <li><Link to="/Dashboard" className="nav-link" onClick={() => window.M.Sidenav.getInstance(document.querySelector('.sidenav')).close()}>Admin Dashboard</Link></li>
                        
                        )}
                    </ul>

                    <a href="#" data-target="mobile-nav" className="sidenav-trigger"><i className="material-icons">menu</i></a>

                    <ul className="right">
                        <Bell count={notificationCount} />
                        <span><img className="userIcon" src="https://static.vecteezy.com/system/resources/previews/019/879/186/original/user-icon-on-transparent-background-free-png.png"/> 
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
