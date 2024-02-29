import { useEffect, useState } from "react";
import Modal from 'react-modal';
import M from 'materialize-css/dist/js/materialize.min.js'; // Import Materialize JS
import 'materialize-css/dist/css/materialize.min.css'; // Import Materialize CSS
import React from "react";
import './Home.css'
import ChatBot from "../components/ChatBot";

const Body = () => {
    
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    // Initialize Materialize dropdown
    const dropdownElems = document.querySelectorAll('.dropdown-trigger');
    M.Dropdown.init(dropdownElems, {
      constrainWidth: false, // Adjust as needed
    });
  }, []);

  const handleDropdownClick = (e) => {
    e.preventDefault(); // Prevent the default behavior (page refresh)
  };

  return (
    <body className="welcome">
      <span id="splash-overlay" className="splash"></span>
      <span id="welcome" className="z-depth-4"></span>

      <main className="valign-wrapper">
        <span className="container grey-text text-lighten-1 ">

          <p className="flow-text">Welcome to</p>
          <h1 className="title grey-text text-lighten-3">Sachin Sharma</h1>

          <blockquote className="flow-text">A Software Engineering world....</blockquote>

          <div className="center-align">
            {/* Dropdown Trigger */}
            <a className="btn dropdown-trigger" href="#!" data-target="exams" onClick={handleDropdownClick}>Projects<i className="material-icons right">expand_more</i></a>

            {/* Dropdown Structure */}
            <ul id="exams" className="dropdown-content">
              <li><a href="">GED&trade; Exam</a></li>
              <li><a href="">HiSET&trade; Exam</a></li>
              <li><a href="">TASC&trade; Exam</a></li>
            </ul>
            
            {/* Dropdown Trigger */}
            <a className="btn dropdown-trigger" href="#!" data-target="study" onClick={handleDropdownClick}>Resume<i className="material-icons right">expand_more</i></a>

            {/* Dropdown Structure */}
            <ul id="study" className="dropdown-content">
              <li><a href="#!">mathematics</a></li>
              <li><a href="#!">reading</a></li>
              <li><a href="#!">science</a></li>
              <li><a href="#!">social studies</a></li>
              <li><a href="#!">writing</a></li>
            </ul>
          </div>

        </span>
      </main>

     
{/* 
      <Modal isOpen={modalIsOpen} onRequestClose={() => setModalIsOpen(false)}>
        <div className="modal-content">
         <ChatBot/>
        </div>
        <div className="modal-footer">
          <button onClick={() => setModalIsOpen(false)} className="modal-action modal-close waves-effect btn-flat">close</button>
        </div>
      </Modal> */}\

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

export default Body;
