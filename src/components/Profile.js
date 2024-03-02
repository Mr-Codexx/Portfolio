import React, { useEffect, useState } from 'react';
import Swiper from 'swiper';
import './Profile.css'; // Assuming you have a CSS file for styling
import Fake from '../Fake'
import ProfileCard from '../ProfileCard';


function Projects() {
  useEffect(() => {
    const postActionsControllers = document.querySelectorAll(".post-actions-controller");

    // When post action controllers are clicked, the action content is opened and closed
    postActionsControllers.forEach((btn) => {
      btn.addEventListener("click", () => {
        const targetId = btn.getAttribute("data-target");
        const postActionsContent = document.getElementById(targetId);

        if (postActionsContent) {
          const isVisible = postActionsContent.getAttribute("data-visible");

          if (isVisible === "false") {
            postActionsContent.setAttribute("data-visible", "true");
            postActionsContent.setAttribute("aria-hidden", "false");
            btn.setAttribute("aria-expanded", "true");
          } else {
            postActionsContent.setAttribute("data-visible", "false");
            postActionsContent.setAttribute("aria-hidden", "true");
            btn.setAttribute("aria-expanded", "false");
          }
        }
      });
    });

    // If the action content is opened, it is closed by clicking outside of it
    function handleClickOutside(event) {
      postActionsControllers.forEach((btn) => {
        const targetId = btn.getAttribute("data-target");
        const postActionsContent = document.getElementById(targetId);

        if (postActionsContent && postActionsContent.getAttribute("data-visible") === "true") {
          if (!postActionsContent.contains(event.target) && event.target !== btn) {
            postActionsContent.setAttribute("data-visible", "false");
            postActionsContent.setAttribute("aria-hidden", "true");
            btn.setAttribute("aria-expanded", "false");
          }
        }
      });
    }

    document.addEventListener("click", handleClickOutside);

    postActionsControllers.forEach((btn) => {
      btn.addEventListener("click", (event) => {
        event.stopPropagation();
      });
    });

    const likeBtns = document.querySelectorAll(".post-like");

    // When the like buttons are clicked, they are colored red or this action is undone
    likeBtns.forEach((likeBtn) => {
      likeBtn.addEventListener("click", () => {
        if (likeBtn.classList.contains("active")) {
          likeBtn.classList.remove("active");
        } else {
          likeBtn.classList.add("active");
        }
      });
    });

    // Initialize Swiper
    var swiper = new Swiper(".swiper", {
      grabCursor: true,
      speed: 400,
      mousewheel: {
        invert: true,
      },
      scrollbar: {
        el: ".swiper-scrollbar",
        draggable: true,
      },
      slidesPerView: 1,
      spaceBetween: 10,
      breakpoints: {
        900: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
      },
    });
    // Cleanup function
    return () => {
      document.removeEventListener("click", handleClickOutside);
      postActionsControllers.forEach((btn) => {
        btn.removeEventListener("click", (event) => {
          event.stopPropagation();
        });
      });
    };
  }, []); // Empty dependency array means this effect will only run once after the initial render

  const author = "Sachin Sharma"


  const [showElement, setShowElement] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setShowElement(true);
    }, 2000); // 2 seconds delay

    return () => clearTimeout(timeout); // Cleanup function to clear timeout on unmount or re-render
  }, []); // Empty dependency array ensures this effect runs only once

  return (
    <body className="welcome">

      <span id="splash-overlay" className="splash"></span>
      <span id="welcome" className="z-depth-4"></span>
      <main className="valign-wrapper">
        <section className={`delayed-element ${showElement ? 'show' : ''}`}>
        {showElement && 
            <div className="swiper">
              <div className="swiper-wrapper">
                <ProfileCard/>

              <div className="swiper-scrollbar"></div>
            </div>
              </div>
}
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
}

export default Projects;
