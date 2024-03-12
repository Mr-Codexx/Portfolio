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
import M from 'materialize-css/dist/js/materialize.min.js';
import 'materialize-css/dist/css/materialize.min.css';
import NotificationBell from "./TEST/testBell";
import { color } from "framer-motion";

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

    const [isOpen, setIsOpen] = useState(false);
    const [updates, setUpdates] = useState([]);

    useEffect(() => {
        M.Modal.init(document.querySelectorAll('.modal'), { inDuration: 300, outDuration: 200 });
    }, []); // Initialize modal on component mount

    const openModal = () => {
        setIsOpen(true);
        fetchData();
    };

    const closeModal = () => {
        setIsOpen(false);
    };
    
    const fetchData = () => {
        fetch('https://followers-ba029-default-rtdb.firebaseio.com/updates.json')
            .then(response => response.json())
            .then(data => {
                if (typeof data === 'object' && data !== null) {
                    const notifications = Object.keys(data).map(key => {
                        const timestamp = data[key].timestamp;
                        const formattedTime = formatTime(timestamp);
                        return {
                            id: key,
                            message: data[key].message,
                            userDetails: data[key].userDetails,
                            time: formattedTime,
                        };
                    });
    
                    // Print timestamp for each notification
                    notifications.forEach(notification => {
                        console.log(`Timestamp for notification with ID ${notification.id}: ${notification.time}`);
                    });
    
                    setUpdates(notifications);
                } else {
                    console.error('Data fetched is not an object:', data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };
    
    const formatTime = (timestamp) => {
        if (!timestamp) {
            return "No timestamp available";
        }
    
        const date = new Date(timestamp);
        if (isNaN(date.getTime())) {
            return "Invalid timestamp";
        }
    
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const month = monthNames[date.getMonth()]; // Extract month name
    
        const hours = date.getHours();
        const minutes = date.getMinutes();
    
        const formattedMonth = month; // Use dynamic month
        const formattedHours = hours < 10 ? '0' + hours : hours; // Pad hours with zero if necessary
        const formattedMinutes = minutes < 10 ? '0' + minutes : minutes; // Pad minutes with zero if necessary
    
        return `${formattedMonth}:${formattedHours} ${date.getDate()}th ${formattedMinutes}th`;
    };
    
    
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
                        <li className="bellicon" onClick={openModal} >
                            <NotificationBell />
                        </li>
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
            <div>

                {/* _______________________________Notification modal_______________________________ */}
                <div id="notifications" className={`modal ${isOpen ? 'open' : ''}`}>
                    <div className="row">
                        <div className="col s12 m6">
                            <div className="card blue-grey darken-1">
                                <div className="card-content white-text">
                                    <span className="card-title">Notifications</span>
                                    <div className="container-notifications">
                                        {updates.map((notification) => (
                                            <p key={notification.id} className="container">
                                                <div className="messageTab">
                                                    <i className="material-icons">message</i>   {notification.message}
                                                </div>
                                                <div className="sender">
                                                    <label>From:</label>
                                                    <i className="material-icons" style={{ color: 'orange' }}>person</i>
                                                    <label style={{ color: 'orange' }}>{notification.userDetails.userName}</label>

                                                    <label style={{ color: 'orange' }}>{notification.userDetails.timestamp}</label> 
                                                    <label className="time"> {notification.time}</label>
                                                </div>
                                                <hr />

                                            </p>
                                        ))}
                                    </div>
                                </div>
                                {/* <div className="card-action">
                                    <a href="#">Marked as unread</a>
                                    <a href="#">Delete</a>
                                </div> */}
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button onClick={closeModal} className="modal-close waves-effect waves-green btn-flat">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
