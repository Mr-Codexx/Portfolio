import React, { useState, useEffect } from "react";
import { useAuth } from '../firebase/auth_check';
import NoUser from '../components/Login/NoUser';
import 'react-toastify/dist/ReactToastify.css';
import './test.css'
import MobileScreen from "./MobileScreen";

const ChatBot = () => {
    const { currentUser } = useAuth();
    
    const [showUserData, setShowUserData] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        message: '',
    });
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setShowUserData(currentUser ? true : false);
    }, [currentUser]);
    useEffect(() => {
        const fetchData = async () => {
            const firebaseURL = 'https://chats-8a81f-default-rtdb.firebaseio.com/chats.json';
            try {
                const response = await fetch(firebaseURL);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                const fetchedMessages = [];
                for (const key in data) {
                    fetchedMessages.push({
                        id: key,
                        name: data[key].sender,
                        message: data[key].message,
                        time: data[key].time
                    });
                }
                setMessages(fetchedMessages);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        // Check if currentUser exists and displayName exists
        if (currentUser && currentUser.displayName) {
            const firstInitial = currentUser.displayName.charAt(0).toUpperCase();
            const lastSpaceIndex = currentUser.displayName.lastIndexOf(' ');
            const lastInitial = currentUser.displayName.charAt(lastSpaceIndex + 1).toUpperCase();
            console.log("First Initial:", firstInitial);
            console.log("Last Initial:", lastInitial);
            console.log("First letter of the first name and last name is the same:", firstInitial === lastInitial);
        }
    }, [currentUser]);

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

    const handleMessageSubmit = async (e) => {
        e.preventDefault();
        if (newMessage.trim() === '') return;

        try {
            const firebaseURL = 'https://chats-8a81f-default-rtdb.firebaseio.com/chats.json';
            const response = await fetch(firebaseURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: newMessage, sender: currentUser.displayName, time: getCurrentTime() })
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

    const renderInitialsAvatar = (name) => {
        const initials = name.split(' ').map(word => word.charAt(0).toUpperCase()).join('');
        return (
            <div className="initials-avatar">
                <span>{initials}</span>
            </div>
        );
    };

    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <>
                    {currentUser ? (
                        <body className="welcome">
                            {/* <MobileScreen/> */}
                            <span id="splash-overlay" className="splash"></span>
                            <span id="welcome" className="z-depth-4"></span>
                            <main className="valign-wrapper">
                                <span className="container grey-text text-lighten-1 ">
                                    <div style={{ position: 'relative', zIndex: 10 }}>
                                        {showUserData && (
                                            <div className="center-align">
                                                <div className="chat-window">
                                                    <form onSubmit={handleMessageSubmit}>
                                                        <div className="card">
                                                            <h5 className="card-header">Chat</h5>
                                                            <div className="card-body">
                                                                <div className="row">
                                                                    {/* _____________________________________________________ */}
                                                                    {messages
                                                                        .filter(message => currentUser.displayName === "Admin" || currentUser.displayName === message.name)
                                                                        .map((message, index) => (
                                                                            <div className="card mb-3" key={index}>
                                                                                <div className="row g-0">
                                                                                    <div className="col-md-4">
                                                                                        {/* Render initials avatar */}
                                                                                        <h1 style={{fontSize: '100px',}}> {renderInitialsAvatar(message.name)}</h1>
                                                                                       
                                                                                    </div>
                                                                                    <div className="col-md-8">
                                                                                        <div className="card-body">
                                                                                            <div className={`message ${message.sender}`}>
                                                                                                <h5 className="card-title">{message.name}:</h5>
                                                                                                <p className="card-text"><b>Message:</b> {message.message}</p>
                                                                                                {currentUser.displayName === "Admin" && (
                                                                                                    <>
                                                                                                        <label>Reply</label>
                                                                                                        <input type="text" />
                                                                                                    </>
                                                                                                )}

                                                                                                <p className="card-text"><small className="text-muted">{message.time}</small></p>
                                                                                            </div>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        ))}


                                                                    {/* ___________________________________________________ */}

                                                                </div>
                                                                <h2 className="card-title">
                                                                    <label>Sender</label> {currentUser.displayName}
                                                                </h2>
                                                                <input
                                                                    type="text"
                                                                    placeholder="Type a message..."
                                                                    value={newMessage}
                                                                    onChange={(e) => setNewMessage(e.target.value)}
                                                                />
                                                                <button type="submit" className="btn btn-primary" >Submit</button>
                                                            </div>
                                                        </div>
                                                    </form>

                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </span>
                            </main>
                        </body>
                    ) : (
                        <NoUser />
                    )}
                </>
            )}
        </>
    );
};

export default ChatBot;
