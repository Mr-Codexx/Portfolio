import React, { useState, useEffect } from 'react';
import './ProfileCard.css';
import Swal from 'sweetalert2';
import { onAuthStateChanged } from "firebase/auth";
import sachin from './Images/Sachin2.png'
import { auth } from "./firebase";

function ProfileCard() {
    const [isActive, setIsActive] = useState(false);
    const [isFollowing, setIsFollowing] = useState(false);
    const [userName, setUserName] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [profileData, setProfileData] = useState({
        followers: 50,
        following: 0,
        articles: 0,
        works: 0
    });

    
    useEffect(() => {
        fetch('https://followers-ba029-default-rtdb.firebaseio.com/data.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setProfileData(data);
            })
            .catch(error => {
                console.error('There was an error fetching data:', error);
            });

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

    const openMessageBox = () => {
        if (!isLoggedIn) {
            // If user is not logged in, show a Swal alert
            Swal.fire({
                icon: "info",
                title: "Please Log In",
                text: "You need to log in first to send a message.",
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false
            });
            return;
        }
    
        setIsActive(true);
    
        Swal.fire({
            title: "Enter your message",
            input: "text",
            inputAttributes: {
                autocapitalize: "off",
                placeholder: "Type your message here..."
            },
            showCancelButton: true,
            confirmButtonText: "Submit",
            allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
            if (result.isConfirmed) {
                const message = result.value;
                // Include user's login details
                const userDetails = {
                    userName: userName,
                };
    
                // Send the message along with user's login details to Firebase Realtime Database URL
                fetch('https://followers-ba029-default-rtdb.firebaseio.com/messages.json', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ message: message, userDetails: userDetails })
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(data => {
                    Swal.fire({
                        title: "Success",
                        text: "Your message has been sent successfully!"
                    });
                })
                .catch(error => {
                    console.error('There was an error sending the message to Firebase Realtime Database:', error);
                    Swal.fire({
                        title: "Error",
                        text: "Failed to send message. Please try again later.",
                        icon: "error"
                    });
                });
            }
        });
    };
    
    

    const closeMessageWindow = () => {
        setIsActive(false);
    };
   const toggleFollow = () => {
    // Check if user is logged in
    if (!isLoggedIn) {
        // Prompt the user to log in first
        Swal.fire({
            icon: "info",
            title: "Please Log In",
            text: "You need to log in first to follow Sachin Sharma.",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
        });
        return; // Exit the function
    }

    setIsFollowing(prevState => !prevState);

    const successMessage = isFollowing ? "Unfollowed" : "Followed";
    const buttonText = isFollowing ? "Follow" : "Unfollow";

    // Fetch the current count from Firebase
    fetch('https://followers-ba029-default-rtdb.firebaseio.com/data.json')
    .then(response => response.json())
    .then(data => {
        let currentFollowersCount = data ? data.Followers || 0 : 0;

        if (isFollowing) {
            currentFollowersCount--; // Decrease the count if unfollowing
        } else {
            currentFollowersCount++; // Increase the count if following
        }

        // Update the count in Firebase
        return fetch('https://followers-ba029-default-rtdb.firebaseio.com/data.json', {
            method: 'PATCH', // Use PATCH method to update existing data
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ Followers: currentFollowersCount }),
        });
    })
    .then(response => {
        if (response.ok) {
            Swal.fire({
                icon: "success",
                title: successMessage,
                text: `Now you are ${buttonText.toLowerCase()} to Sachin Sharma. Thanks!`,
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false
            });
        } else {
            throw new Error('Network response was not ok.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire({
            icon: "error",
            title: "Error",
            text: "An error occurred. Please try again later.",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
        });
    });
};
    const sendMessage = () => {
        // Placeholder function for sending message
        Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Your message has been successfully sent.',
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false
        });
        closeMessageWindow();
    };

    return (
        <div className="wrapper">
            <div className="profile-card js-profile-card">
                <div className="profile-card__img">
                    <img src={sachin} alt="profile card" />
                </div>

                <div className="profile-card__cnt js-profile-cnt">
                    <div className="profile-card__name"><strong>Mr.</strong> Sachin Sharma</div>
                    <div className="profile-card__txt">Front-end Developer from <strong>Hyderabad</strong></div>
                    <div className="profile-card-loc">
                        <span className="profile-card-loc__icon">
                            <svg className="icon"><use xlinkHref="#icon-location"></use></svg>
                        </span>
                        <span className="profile-card-loc__txt">Telangana, 𝕀ℕ𝔻𝕀𝔸</span>
                    </div>

                    <div className="profile-card-inf">
                        <div className="profile-card-inf__item">
                            {/* {console.log(profileData.Followers)} */}
                            <div className="profile-card-inf__title">{profileData.Followers}</div>
                            <div className="profile-card-inf__txt">Followers</div>
                        </div>
                        <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">{profileData.Following}</div>
                            <div className="profile-card-inf__txt">Following</div>
                        </div>
                        <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">{profileData.Articles}</div>
                            <div className="profile-card-inf__txt">Articles</div>
                        </div>
                        <div className="profile-card-inf__item">
                            <div className="profile-card-inf__title">{profileData.Works}</div>
                            <div className="profile-card-inf__txt">Works</div>
                        </div>
                    </div>

                    <div className="profile-card-social">
                        {/* Social media links */}
                        <div className="profile-card-social">
  <a href="#" className="profile-card-social__item facebook" target="_blank">
    <span className="icon-font">
      <i className="fa fa-facebook"></i>
    </span>
  </a>

  <a href="#" className="profile-card-social__item twitter" target="_blank">
    <span className="icon-font">
      <i className="fa fa-twitter"></i>
    </span>
  </a>

  <a href="#" className="profile-card-social__item instagram" target="_blank">
    <span className="icon-font">
      <i className="fa fa-instagram"></i>
    </span>
  </a>

  <a href="#" className="profile-card-social__item behance" target="_blank">
    <span className="icon-font">
      <i className="fa fa-behance"></i>
    </span>
  </a>

  <a href="#" className="profile-card-social__item github" target="_blank">
    <span className="icon-font">
      <i className="fa fa-github"></i>
    </span>
  </a>

  <a href="#" className="profile-card-social__item codepen" target="_blank">
    <span className="icon-font">
      <i className="fa fa-codepen"></i>
    </span>
  </a>

  <a href="#" className="profile-card-social__item link" target="_blank">
    <span className="icon-font">
      <i className="fa fa-link"></i>
    </span>
  </a>
</div>

                    </div>

                    <div className="profile-card-ctr">
                        <button className="profile-card__button button--blue js-message-btn" onClick={openMessageBox}>Message</button>
                        <button className="profile-card__button button--orange" onClick={toggleFollow}>
                            {isFollowing ? "Unfollow" : "Follow"}
                        </button>
                    </div>
                </div>

                <div className={`profile-card-message js-message ${isActive ? 'active' : ''}`}>
                    <form className="profile-card-form">
                        <div className="profile-card-form__container">
                            <textarea placeholder="Say something..."></textarea>
                        </div>

                        <div className="profile-card-form__bottom">
                            <button className="profile-card__button button--blue js-message-send" onClick={sendMessage}>
                                Send
                            </button>
                            <button className="profile-card__button button--gray js-message-close" onClick={closeMessageWindow}>
                                Cancel
                            </button>
                        </div>
                    </form>

                    <div className="profile-card__overlay js-message-close" onClick={closeMessageWindow}></div>
                </div>
            </div>
        </div>
    );
}

export default ProfileCard;
