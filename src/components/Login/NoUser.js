import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  const [showUserData, setShowUserData] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowUserData(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const mainStyle = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: showUserData ? 1 : 0,
    transition: "opacity 2s",
    transform: showUserData ? "translateY(0)" : "translateY(20px)",
  };

  return (
    <body className="welcome">
      <span id="splash-overlay" className="splash"></span>
      <span id="welcome" className="z-depth-4"></span>

      <main style={mainStyle}>
        <section>
          <div className="recipe-container">
            <div className="container"  style={mainStyle}>
              <img src="https://cdn-icons-png.flaticon.com/128/2170/2170153.png" alt="login"></img>
            </div>
            <h1> Sorry, Needs Login..</h1>
            <h1>
              <Link to="/Login" className="btn nav-link">
                Login
              </Link>
            </h1>

            <div className="swiper">
              <div className="swiper-scrollbar"></div>
            </div>
          </div>
        </section>
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
