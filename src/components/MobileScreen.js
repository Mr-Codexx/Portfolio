import { useState, useEffect } from "react";
import Modal from 'react-modal';
import React from "react";
import Register from '../firebase/UserRegistrationform'
import { useAuth } from '../firebase/auth_check';
import NoUser from '../components/Login/NoUser'

const Contact = () => {
    const { currentUser } = useAuth();
    const [showUserData, setShowUserData] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);
// console.log(currentUser);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowUserData(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (
<>
{currentUser ? (
        <body className="welcome">
        <span id="splash-overlay" className="splash"></span>
        <span id="welcome" className="z-depth-4"></span>


        <main className="valign-wrapper">
            <span className="container grey-text text-lighten-1 ">

                <div >
                    {showUserData && (
                        <div className="center-align">
                            <h1>Use Desktop Mode</h1>
                        </div>
                    )}
                </div>

            </span>
        </main>

       
    </body>
      ) : (
        <NoUser/>
      )}
</>
        
    );
};

export default Contact;
