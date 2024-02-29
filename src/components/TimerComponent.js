// TimerComponent.js
import React, { useState, useEffect } from 'react';
import './TimerComponent.css'; // Import CSS for TimerComponent

const TimerComponent = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes(minutes => minutes + 1);
    }
    if (minutes === 60) {
      setMinutes(0);
      setHours(hours => hours + 1);
    }
  }, [seconds, minutes]);

  return (
    <div className="timer-container">
      <span>Duration: {hours < 10 ? '0' + hours : hours}:{minutes < 10 ? '0' + minutes : minutes}:{seconds < 10 ? '0' + seconds : seconds}</span>
    </div>
  );
};

export default TimerComponent;
