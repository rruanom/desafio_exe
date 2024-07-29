// AuthContext.jsx
import React, { createContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:5000/api';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get('access_token'));
    const [userType, setUserType] = useState(null);
    const [name, setName] = useState(null);
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
            const response = await fetch(`${API_URL}/user/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!response.ok) throw new Error('Failed to fetch user data');

            const data = await response.json();
            setEmail(data.email);

            let userDetails;
            if (data.userType === 'candidate') {
                const candidateResponse = await fetch(`${API_URL}/candidate/${data.email}`);
                userDetails = await candidateResponse.json();
                setUserType('candidate');
                setName(userDetails.first_name);
                setStatus(userDetails.name_status);
            } else if (data.userType === 'staff') {
                const staffResponse = await fetch(`${API_URL}/staff/${data.email}`);
                userDetails = await staffResponse.json();
                setUserType('staff');
                setName(userDetails.first_name);
                setRole(userDetails.id_role);
            }

            console.log('User details:', userDetails); // Para depuración
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
        console.log('Login data:', userData); // Para depuración
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