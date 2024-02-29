import { useState } from "react";
import Modal from 'react-modal';
import React from "react";
import Register from '../firebase/Dashboard'

const Contact = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (

        <body className="welcome">


            <main className="valign-wrapper">
                <span className="container grey-text text-lighten-1 ">

                    <div className="center-align">
                    <h1>NO PAGE FOUND</h1>
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
