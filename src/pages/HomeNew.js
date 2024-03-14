import React, { useEffect, useState } from 'react';
import { TweenMax, Expo } from 'gsap';
import './HomeNew.css'
import SachinPic from '../Images/Sachin (2).png';
import Sachin from '../Images/SIGN.png';
import Modal from 'react-modal';
import M from 'materialize-css/dist/js/materialize.min.js'; // Import Materialize JS
import 'materialize-css/dist/css/materialize.min.css'; // Import Materialize CSS
const PortfolioPage = () => {
  const [activeButton, setActiveButton] = useState(null);

  const activateButton = (index) => {
    setActiveButton(index);
  };
  
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
  useEffect(() => {
    const navLink = document.querySelectorAll('.nav_link');
    function linkAct() {
      navLink.forEach((n) => n.classList.remove('active'));
      this.classList.add('active');
    }

    navLink.forEach((n) => n.addEventListener('click', linkAct));

    // Ensure elements are rendered before running animations
    TweenMax.from('.left_menu', 1, {
      delay: 2.5,
      opacity: 0,
      x: -50,
      ease: Expo.easeInOut,
    });
    TweenMax.from('.right_menu', 1, {
        delay: 1.5,
        opacity: 0,
        y: 650,
        ease: Expo.easeInOut,
      });

    TweenMax.from('.nav_links_content ul li', 1, {
      delay: 3.5,
      opacity: 0,
      x: 100,
      ease: Expo.easeInOut,
    }, 0.08);

    TweenMax.from('.search_icon', 1, {
      delay: 2.5,
      opacity: 0,
      x: -50,
      ease: Expo.easeInOut,
    });

    TweenMax.from('.larger_text_content', 1, {
      delay: 4,
      opacity: 0,
      y: -100,
      ease: Expo.easeInOut,
    });

    TweenMax.from('.desc_content', 1, {
      delay: 4.5,
      opacity: 0,
      x: 100,
      ease: Expo.easeInOut,
    });

    TweenMax.to('.overlay', 2, {
      delay: 1,
      top: '-100%',
      ease: Expo.easeInOut,
    });

    return () => {
      navLink.forEach((n) => n.removeEventListener('click', linkAct));
    };
  }, []);

  return (
    <>
    <body className="">
      <span id="splash-overlay" className="splash"></span>
      <span id="welcome" className="z-depth-4"></span>

      <main className="-wrapper">
      <div className="overlay">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="250"
          height="250"
          fill="none"
          stroke="#fff"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* SVG path here */}
        </svg>
      </div>

      <div className="wrapper">
        <div className="wrapper2">
          {/*===== LEFT MENU =====*/}
          <main className="left_menu">
            <section className="brand">
              <div className="logo">
                <div className="logo_circle">
                  <img src={Sachin} alt='Sachin'></img>
                </div>
              </div>
            </section>
            {/*===== SOCIAL ICONS =====*/}
            <section className="social_content">
  <ul className="social_icons_list">
    <li
      className={`social_icons_list_item ${activeButton === 0 ? 'active' : ''}`}
      onClick={() => activateButton(0)}
    >
      <a href="https://www.facebook.com/sachinsharma.may" target="_blank">
        <i className="fa fa-facebook icon"></i>
      </a>
    </li>
    <li
      className={`social_icons_list_item ${activeButton === 1 ? 'active' : ''}`}
      onClick={() => activateButton(1)}
    >
      <a href="https://wa.me/917906310812?text=Hi%20Mr.%20Sachin%20Sharma,%20I%20am%20sending%20you%20this%20message!! **from_new_website** !!!" target="_blank">
        <i className="fa fa-whatsapp icon"></i>
      </a>
    </li>
    <li
      className={`social_icons_list_item ${activeButton === 2 ? 'active' : ''}`}
      onClick={() => activateButton(2)}
    >
      <a href="https://www.instagram.com/official.sachinsharma" target="_blank">
        <i className="fa fa-instagram icon"></i>
      </a>
    </li>
    <li
      className={`social_icons_list_item ${activeButton === 3 ? 'active' : ''}`}
      onClick={() => activateButton(3)}
    >
      <a href="https://twitter.com" target="_blank">
        <i className="fa fa-twitter icon"></i>
      </a>
    </li>
    <li
      className={`social_icons_list_item ${activeButton === 4 ? 'active' : ''}`}
      onClick={() => activateButton(4)}
    >
      <a href="https://www.linkedin.com/in/mr-sachinsharma" target="_blank">
        <i className="fa fa-linkedin icon"></i>
      </a>
    </li>
  </ul>
</section>

          </main>
          <main className="right_menu">
              <div className="">
                <div className="logo_circle">
                  <img src={SachinPic} alt='Sachin'></img>
                </div>
              </div>
          </main>
        </div>
        <footer className="page-footer deep-purple darken-3">
            <div className="footer-copyright deep-purple darken-4">
                <div className="container">
                    <time dateTime="{{ site.time | date: '%Y' }}">&copy; 2024 Sachin Sharma</time>
                </div>
            </div>
        </footer>
      </div>
      
      </main>
      </body>
    </>
  );
};

export default PortfolioPage;
