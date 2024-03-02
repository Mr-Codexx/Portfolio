import React, { useState, useEffect } from 'react';
import './Dashboard.css'
import Header from './Header'
import ProjectsSection from './Projects'
import Sidebar from './Sidebar'
import Messages from './Messages'
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
import NoUser from '../Login/NoUser'

function Dashboard() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is logged in
            setUserName(user.displayName);
            setIsLoggedIn(true); // Set isLoggedIn state to true
        } else {
            setUserName("");
            setIsLoggedIn(false); // Set isLoggedIn state to false
        }
    });
}, []);
// console.log(userName);
    return (
        <body className="welcome" >
            <span id="splash-overlay" className="splash"></span>
            <span id="welcome" className="z-depth-4"></span>
{userName === "SuperUser" ? (
            <main className="valign-wrapper">
                <div className="mai">
                  {/* <Header/> */}
                    <div className="app-content">
                       <Sidebar/>
                       <ProjectsSection/>
                        <div className="messages-section">
                            <button className="messages-close">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width={24}
                                    height={24}
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="feather feather-x-circle"
                                >
                                    <circle cx={12} cy={12} r={10} />
                                    <line x1={15} y1={9} x2={9} y2={15} />
                                    <line x1={9} y1={9} x2={15} y2={15} />
                                </svg>
                            </button>
                            <div className="projects-section-header">
                                <p>Client Messages</p>
                            </div>
                           <Messages/>
                        </div>
                    </div>
                </div>

            </main>
      ) : (
        <NoUser/>
      )}
        </body>
    )
}

export default Dashboard