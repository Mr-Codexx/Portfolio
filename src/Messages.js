import React, { useState, useEffect } from 'react';
import './MessagesViwer.css';
const MessageViewer = () => {
    const [messages, setMessages] = useState([]);
    const [showCardBody, setShowCardBody] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowCardBody(true);
        }, 2000);

        return () => clearTimeout(timeout);
    }, []);


    useEffect(() => {
        // Fetch messages from Firebase Realtime Database
        fetch('https://followers-ba029-default-rtdb.firebaseio.com/messages.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // Extract messages from response data
                const fetchedMessages = [];
                for (const key in data) {
                    fetchedMessages.push({
                        id: key,
                        message: data[key].message,
                        userDetails: data[key].userDetails
                    });
                }
                setMessages(fetchedMessages);
            })
            .catch(error => {
                console.error('There was an error fetching messages:', error);
            });
    }, []);
    return (
        <body className="welcome">
            <span id="splash-overlay" className="splash"></span>
            <span id="welcome" className="z-depth-4"></span>
            <main className="valign-wrapper">
                <span className="container grey-text text-lighten-1 ">
                    <div className=''>
                        <div className="center-align">
                            <div className="recie">
                                <h2 className="text-center mb-4">Messages</h2>
                                <div className="row">
                                    {messages.map(message => (
                                        <div key={message.id} className="col-md-4 mb-4">
                                            <div className={`card-body ${showCardBody ? 'show' : ''}`}>
                                                {message.userDetails && (
                                                    <div className="Customcard  mb-3" style={{ maxWidth: "18rem" }}>
                                                        <div className="card-header">Message from <b className='name'>{message.userDetails.userName}</b></div>
                                                    </div>
                                                )}
                                                <h6 className="card-title">h {message.message}</h6>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                </span>
            </main>


        </body>
    );
};

export default MessageViewer;
