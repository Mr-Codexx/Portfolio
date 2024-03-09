import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const FullscreenSwitch = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    Swal.fire({
      title: 'Fullscreen',
      text: 'Do you want to enter fullscreen mode?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        document.documentElement.requestFullscreen().then(() => {
          setIsFullscreen(true);
        }).catch((err) => {
          console.error('Failed to enter fullscreen mode: ', err);
        });
      }
    });
  }, []); // Empty dependency array means this effect will only run once, on component mount

  const handleFullscreenToggle = () => {
    // This function remains the same for handling subsequent toggles
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch((err) => {
        console.error('Failed to enter fullscreen mode: ', err);
      });
    } else {
      document.exitFullscreen().then(() => {
        setIsFullscreen(false);
      }).catch((err) => {
        console.error('Failed to exit fullscreen mode: ', err);
      });
    }
  };

  return (
    <div className="switch">
     
    </div>
  );
};

export default FullscreenSwitch;
