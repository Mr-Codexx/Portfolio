import React, { useState, useEffect } from 'react';

const Messages = () => {
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
        <div className="messages">
            {messages.map(message => (
                <div key={message.id} className="message-box">
                    <img
                        src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2550&q=80"
                        alt="profile image"
                    />
                    <div className="message-content">
                        {message.userDetails && (
                            <div>
                                <div className="mess_name"><b>{message.userDetails.userName}</b></div>
                            </div>
                        )}
                        <h6 className="message-line">h {message.message}</h6>
                        <p className="message-line time">Dec, 12</p>
                    </div>
                </div>
            ))}
            
        </div>
    )
}

export default Messages