import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserIPComponent = () => {
  const [userIP, setUserIP] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserIP = async () => {
      try {
        const response = await axios.get('https://api.ipify.org?format=json');
        setUserIP(response.data.ip);
      } catch (error) {
        console.error('Error fetching user IP:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserIP();
  }, []);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>User IP Address: {userIP}</p>
      )}
    </div>
  );
};

export default UserIPComponent;
