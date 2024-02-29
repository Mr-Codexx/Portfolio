import { useState, useEffect } from "react";
import Modal from 'react-modal';
import React from "react";
// import './Home.css'

const Contact = () => {
    const [showUserData, setShowUserData] = useState(false);
    const [modalIsOpen, setModalIsOpen] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowUserData(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);
    return (

        <body className="welcome">

            <span id="splash-overlay" className="splash"></span>
            <span id="welcome" className="z-depth-4"></span>


            <main className="valign-wrapper">
                <h1> Login required....</h1>
            </main>

            <div className="fixed-action-btn">
                <button onClick={() => setModalIsOpen(true)} className="btn btn-large btn-floating amber waves-effect waves-light">
                    <i className="large material-icons">message</i>
                </button>
            </div>

            <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
                <div className="modal-content">
                    <h4>Contact</h4>
                    <p>coming soon...</p>
                </div>
                <div className="modal-footer">
                    <button onClick={() => setModalIsOpen(false)} className="modal-action modal-close waves-effect btn-flat">close</button>
                </div>
            </Modal>

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
