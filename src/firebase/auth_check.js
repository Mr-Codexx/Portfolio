import React, { createContext, useState, useEffect, useContext } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Create context for authentication
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => useContext(AuthContext);

// Authentication provider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe;
    }, []);

    const value = {
        currentUser
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
};
