// AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

const API_URL = import.meta.env.VITE_API_URL || '/api'
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('access_token'));
    const [userType, setUserType] = useState(null);
    const [name, setName] = useState(null);
    const [id, setId] = useState(null);
    const [role, setRole] = useState(null);
    const [status, setStatus] = useState(null);
    const [email, setEmail] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        if (!token) {
            setLoading(false);
            return;
        }

        try {
            const response = await fetch(`${API_URL}/candidate/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch user data');

            const data = await response.json();
            console.log(data)
            setEmail(data.user.email);
            setId(data.user.id);

            let userDetails;
            if (!data.user.rol) {
                const candidateResponse = await fetch(`${API_URL}/candidate/${data.user.email}`);
                userDetails = await candidateResponse.json();
                setUserType('candidate');
                setName(userDetails.first_name);
                setStatus(userDetails.name_status);
            } else {
                const staffResponse = await fetch(`${API_URL}/staff/${data.user.email}`);
                userDetails = await staffResponse.json();
                setUserType('staff');
                setName(userDetails.first_name);
                setRole(userDetails.name_role);
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            logout();
        } finally {
            setLoading(false);
        }
    }, [token]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = (userData) => {
        Cookies.set('access_token', userData.token, {
            expires: 1,
            path: '/',
            secure: true,
            sameSite: 'strict'
        });
        setToken(userData.token);
        setUserType(userData.userType);
        setName(userData.first_name);
        setEmail(userData.email);
        if (userData.userType === 'candidate') {
            setStatus(userData.status);
        } else if (userData.userType === 'staff') {
            setRole(userData.id_role);
        }
    };

    const logout = () => {
        Cookies.remove('access_token');
        setToken(null);
        setUserType(null);
        setName(null);
        setRole(null);
        setStatus(null);
        setEmail(null);
    };

    const value = {
        token,
        userType,
        id,
        setUserType,
        name,
        role,
        status,
        email,
        loading,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => React.useContext(AuthContext);