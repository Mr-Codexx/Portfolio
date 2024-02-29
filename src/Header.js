import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import './Header.css'
import { logout } from "./auth"; // Import the logout function
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import Bell from './components/Bell'

const Header = ({ isLoggedIn, role, handleLogin }) => {
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();
    const notificationCount = 3;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            
    console.log(user)
            if (user) {
                // User is logged in
                setUserName(user.displayName);
                // Extract email domain
                const emailParts = user.email.split('@');
                if (emailParts.length === 2) {
                    const domain = emailParts[1];
                    console.log('Email Domain:', domain);
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
    const isSachin = userName === "Sachin" || "Sachin Sharma";
    return (
        <header className="navbar-fixed">
            <nav className="row deep-purple darken-3">
                <div className="col s12">
                    <ul className="left">
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Me</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                        {/* Conditionally render admin dashboard link based on role */}
                        {isSachin && (
                            <li><Link to="/Admin">Admin Dashboard</Link></li>
                        )}
                    </ul>
                    
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
                            <div>


                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
