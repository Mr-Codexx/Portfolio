import React, { useState, useEffect } from 'react';
import axios from 'axios';

const useAuth = () => {
    const [role, setRole] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('authToken'); // Retrieve token securely (decrypt)

        if (token) {
            (async () => {
                try {
                    const response = await axios.get('/api/verify', { headers: { Authorization: `Bearer ${token}` } });
                    setRole(response.data.role); // Implement role retrieval from backend
                } catch (error) {
                    console.error(error); // Handle errors securely
                    localStorage.removeItem('authToken');
                }
            })();
        }
    }, []);

    return role;
};

export default useAuth;
