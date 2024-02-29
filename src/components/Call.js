import React, { useState, useEffect, useRef } from 'react';
import './Call.css';
import TimerComponent from './TimerComponent';

const CallComponent = ({ callData, props }) => {
  const [isDeclined, setIsDeclined] = useState(false);
  const [isAccepted, setIsAccepted] = useState(false);
  const [timerStarted, setTimerStarted] = useState(false);
  const [backgroundStream, setBackgroundStream] = useState(null);
  const videoRef = useRef(null);

  const handleDecline = () => {
    setIsDeclined(true);
    console.log('Decline successful');
  };

  const sendDataToParent = () => {
    props.sendDataToParent("Hello from child");
  };



  const handleAccept = () => {
    setIsAccepted(true);
    setTimerStarted(true);
    if (callData.type === 'video') {
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
    }
  };

  const handleDropCall = () => {
    // Redirect to another component or perform any desired action
    console.log('handledrop');
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

  return (
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
        {/* <video ref={videoRef} autoPlay playsInline /> */}
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
              <a className="button -decline js-decline" href="#" onClick={handleDecline}>
                Drop Call
              </a>
            </div>
          </div>
        )}
      </main>
      <div>
      <button onClick={sendDataToParent}>Send Data to Parent</button>
    </div>
      </div>
  );
};

export default CallComponent;
