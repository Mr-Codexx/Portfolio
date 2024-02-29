import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import './Admin.css';
import UserData from "../firebase/UserData";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NoUser from "../components/Login/NoUser"

const Contact = () => {
    const [showUserData, setShowUserData] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        const timer = setTimeout(() => {
            setShowUserData(true);
        }, 2000);

        return () => {
            unsubscribe();
            clearTimeout(timer);
        };
    }, []);

    if (!user) {
        return <NoUser/>; // Render a login component or redirect to login page
    }

    const displayName = user.displayName;
    const email = user.email;
    const photoURL = user.photoURL;
    const emailVerified = user.emailVerified;
    const uid = user.uid;

    return (
        <body className="welcome">
            <span id="splash-overlay" className="splash"></span>
            <span id="welcome" className="z-depth-4"></span>

            <main className="valign-wrapper">
                <span className="container grey-text text-lighten-1 ">
                    <div>
                        {showUserData && (
                            <div className="center-align">
                                <UserData />
                            </div>
                        )}
                    </div>
                </span>
            </main>
            <footer className="page-footer deep-purple darken-3">
                <div className="footer-copyright deep-purple darken-4">
                    <div className="container">
                        <time dateTime="{{ site.time | date: '%Y' }}">&copy; 2024 Sachin Sharma</time>
                    </div>
                </div>
            </footer>
        </body>
    );
};

export default Contact;
