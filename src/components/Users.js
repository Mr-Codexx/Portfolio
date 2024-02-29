import React, { useEffect, useState, useRef } from 'react';
import './test.css'; // Assuming you have a CSS file for styling
import TimerComponent from './TimerComponent';
import './Call.css';

function Projects() {
    const [showElement, setShowElement] = useState(false);
    const [chats, setChats] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null); // State to track selected user
    const [callActive, setCallActive] = useState(false); // State to track if a call is active
    const [callData, setCallData] = useState(null); // State to hold call data    
    const [isDeclined, setIsDeclined] = useState(false);
    const [isAccepted, setIsAccepted] = useState(false);
    const [timerStarted, setTimerStarted] = useState(false);
    const [backgroundStream, setBackgroundStream] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const videoRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://chats-8a81f-default-rtdb.firebaseio.com/chats.json');
                const data = await response.json();
                if (data) {
                    const chatArray = Object.values(data);
                    setChats(chatArray);
    
                    // Set the selectedUser to the first user by default
                    if (chatArray.length > 0) {
                        setSelectedUser(chatArray[0].sender);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);
    
    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowElement(true);
        }, 2000); // 2 seconds delay

        return () => clearTimeout(timeout); // Cleanup function to clear timeout on unmount or re-render
    }, []);

    const getCurrentTime = () => {
        const now = new Date();
        let hours = now.getHours();
        const minutes = now.getMinutes();
        const meridiem = hours >= 12 ? 'PM' : 'AM';

        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // Handle midnight (0 hours)

        // Add leading zero for single digit minutes and seconds
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;

        return `${hours}:${formattedMinutes}${meridiem}`;
    };

    const handleDecline = () => {
        setIsDeclined(true);
        setCallActive(false); // Update callActive state to false
        console.log('Decline successful');
    };
    

    const handleAccept = () => {
        setIsAccepted(true);
        setTimerStarted(true);
        if (callData.type === 'video') {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then(stream => {
                        setBackgroundStream(stream);
                        if (videoRef.current) {
                            videoRef.current.srcObject = stream;
                        }
                    })
                    .catch(error => {
                        console.error('Error accessing camera:', error);
                    });
            } else {
                console.error('getUserMedia is not supported');
                // Handle the case where getUserMedia is not supported (e.g., show a message to the user)
            }
        }
    };
    

    const handleDropCall = () => {
        setIsDeclined(true);
        setCallActive(false); // Update callActive state to false
        console.log('Decline successful');
    };

    useEffect(() => {
        if (isAccepted && !timerStarted) {
            setTimerStarted(true);
        }

        return () => {
            if (backgroundStream) {
                backgroundStream.getTracks().forEach(track => track.stop());
            }
        };
    }, [isAccepted, timerStarted, backgroundStream]);

    const handleUserClick = (user) => {
        setSelectedUser(user);
    };

    const handleVideoCall = () => {
        setCallActive(true);
        setCallData({ type: 'video', user: selectedUser });
    
        // Check if navigator.mediaDevices and getUserMedia are available
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            // Use browser's getUserMedia API to initiate video call
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(stream => {
                    // Handle the stream (you might want to implement further logic here)
                    console.log('Video call started');
                })
                .catch(error => {
                    console.error('Error starting video call:', error);
                });
        } else {
            console.error('getUserMedia is not supported');
            // Handle the case where getUserMedia is not supported (e.g., show a message to the user)
        }
    };
    

    const handleAudioCall = () => {
        setCallActive(true);
        setCallData({ type: 'audio', user: selectedUser });
        // Use browser's getUserMedia API to initiate audio call
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                // Handle the stream (you might want to implement further logic here)
                console.log('Audio call started');
            })
            .catch(error => {
                console.error('Error starting audio call:', error);
            });
    };

    const handleSendMessage = async () => {
        if (newMessage.trim() === '') return;

        try {
            const firebaseURL = 'https://chats-8a81f-default-rtdb.firebaseio.com/chats.json';
            const response = await fetch(firebaseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: newMessage, sender: selectedUser, time: getCurrentTime() })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            console.log('Data sent successfully:', data);
            setNewMessage('');
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <body className="welcome">
            <span id="splash-overlay" className="splash"></span>
            <span id="welcome" className="z-depth-4"></span>
            <main className="valign-wrapper">
                <section className={`delayed-element ${showElement ? 'show' : ''}`}>
                    {showElement && (
                        <div className="recipe-container">
                            <div className="">
                                <div className="swiper-wrapper">
                                    <div className="container-fluid h-100">
                                        <div className="row justify-content-center h-100">
                                            {!callActive && (
                                                <div className="col-md-4 col-xl-3 chat">
                                                    <div className="card mb-sm-3 mb-md-0 contacts_card">
                                                        <div className="card-header">
                                                            <div className="input-group">
                                                                <input type="text" placeholder="Search..." name="" className="form-control search" />
                                                            </div>
                                                        </div>
                                                        <div className="card-body contacts_body">
                                                            {chats.map((chat, index) => (
                                                                (index === 0 || chats[index - 1].sender !== chat.sender) && (
                                                                    <ul className="contacts" key={chat.time}>
                                                                        <li className="active">
                                                                            <div className="d-flex bd-highlight">
                                                                                <div className="img_cont">
                                                                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="user" />
                                                                                    <span className="online_icon"></span>
                                                                                </div>
                                                                                <div className="user_info">
                                                                                    <span onClick={() => handleUserClick(chat.sender)}>{chat.sender}</span>
                                                                                    <p>{new Date(chat.time).toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})}</p>
                                                                                </div>
                                                                            </div>
                                                                        </li>
                                                                    </ul>
                                                                )
                                                            ))}
                                                        </div>
                                                        <div className="card-footer"></div>
                                                    </div>
                                                </div>
                                            )}
                                            <div className={`col-md-8 col-xl-6 chat ${callActive ? 'call-active' : ''}`}>
                                                {callActive ? (
                                                    <div className={`call ${isDeclined ? 'is-declined' : ''} ${isAccepted ? 'is-accepted' : ''} mt-2`}>
                                                        <header className='header'>
                                                            <h1 className='text-center'>Incoming Call</h1>
                                                            {!isAccepted && (
                                                                <a className="header-close js-decline" href="#" onClick={handleDecline}>
                                                                    X
                                                                </a>
                                                            )}
                                                        </header>
                                                        <main>
                                                            <div className="user">
                                                                <div className="user-photo">
                                                                    <div className="user-photo__wrap">
                                                                        <img src="https://sachinsharma2111.github.io/Home/favicon.png" alt="Profile" />
                                                                    </div>
                                                                </div>
                                                                <div className="user-name">{callData.user}</div>
                                                            </div>
                                                            {timerStarted && <TimerComponent />}
                                                            <div className="status">
                                                                {[...Array(4)].map((_, index) => (
                                                                    <div key={index} className="circle"></div>
                                                                ))}
                                                            </div>
                                                            {!isAccepted ? (
                                                                <div className="buttons">
                                                                    <div className="col">
                                                                        <a className="button -decline js-decline" isDeclined={isDeclined} href="#" onClick={handleDecline}>
                                                                            Decline
                                                                        </a>
                                                                    </div>
                                                                    <div className="col">
                                                                        <a className="button -accept js-accept" href="#" onClick={handleAccept}>
                                                                            Accept
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            ) : (
                                                                <div className="buttons">
                                                                    <div className="col">
                                                                        <a className="button -decline js-decline" href="#" onClick={handleDropCall}>
                                                                            Drop Call
                                                                        </a>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </main>
                                                    </div>
                                                ) : (
                                                    <div className="card">
                                                        <div className="card-header msg_head">
                                                            <div className="d-flex bd-highlight">
                                                                <div className="img_cont">
                                                                    <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img" alt="user" />
                                                                    <span className="online_icon"></span>
                                                                </div>
                                                                <div className="user_info">
                                                                    <span>{selectedUser}</span>
                                                                    <p>1767 Messages</p>
                                                                </div>
                                                                <div className="video_cam">
                                                                    <span onClick={handleVideoCall}><i className="fa fa-video-camera"></i></span>{/* video call function */}
                                                                    <span onClick={handleAudioCall}><i className="fa fa-phone"></i></span> {/* audio call function */}
                                                                </div>
                                                            </div>
                                                            <span id="action_menu_btn"><i className="fa fa-ellipsis-v"></i></span>
                                                            <div className="action_menu">
                                                                <ul>
                                                                    <li><i className="fa fa-user-circle"></i> View profile</li>
                                                                    <li><i className="fa fa-users"></i> Add to close friends</li>
                                                                    <li><i className="fa fa-plus"></i> Add to group</li>
                                                                    <li><i className="fa fa-ban"></i> Block</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                        <div className="card-body msg_card_body">
                                                            {chats.map((chat, index) => (
                                                                <div key={index} className={`d-flex justify-content-${chat.sender === "Sachin Sharma" ? "start" : "end"} mb-4`}>
                                                                    <div className="img_cont_msg">
                                                                        <img src="https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg" className="rounded-circle user_img_msg" />
                                                                    </div>
                                                                    <div>
                                                                        <div key={index} className={chat.sender === selectedUser ? "msg_cotainer" : "msg_cotainer_send"}>
                                                                            <span className={chat.sender === selectedUser ? "msg_cotainer" : "msg_cotainer_send"}>{chat.message}</span>
                                                                            <span className={chat.sender === selectedUser ? "msg_time" : "msg_time_send"}>
                                                                                {new Date(chat.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            ))}
                                                        </div>
                                                        <div className="card-footer">
                                                            <div className="input-group">
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text attach_btn"><i className="fa fa-paperclip"></i></span>
                                                                </div>
                                                                <textarea name="" className="form-control type_msg" placeholder="Type your message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)}></textarea>
                                                                <div className="input-group-append">
                                                                    <span className="input-group-text send_btn" onClick={handleSendMessage}><i className="fa fa-location-arrow"></i></span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
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
