// src/context/AuthContext.jsx – Authentication context
import { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    // Load user from localStorage on mount
    useEffect(() => {
        const stored = localStorage.getItem('userInfo');
        if (stored) {
            setUser(JSON.parse(stored));
        }
    }, []);

    // Login – save user info + token
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('userInfo', JSON.stringify(userData));
    };

    // Logout – clear everything
    const logout = () => {
        setUser(null);
        localStorage.removeItem('userInfo');
    };

    const updateUser = (updatedData) => {
        const merged = { ...user, ...updatedData };
        setUser(merged);
        localStorage.setItem('userInfo', JSON.stringify(merged));
    };

    return (
        <AuthContext.Provider value={{ user, login, logout , updateUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for consuming auth context
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export default AuthContext;
