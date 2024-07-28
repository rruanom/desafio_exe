import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/Authservices';
import Cookies from 'js-cookie';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = Cookies.get('access-token');
            const userData = Cookies.get('user');
            if (token && userData) {
                setUser(JSON.parse(userData));
            } else {
                const currentUser = await authService.getCurrentUser();
                setUser(currentUser);
            }
            setLoading(false);
        };
        fetchUser();
    }, []);

    const login = async (email, password, userType) => {
        const data = await authService.login(email, password, userType);
        Cookies.set('access-token', data.token, { expires: 1, path: '/' });
        Cookies.set('user', JSON.stringify(data.user), { expires: 1, path: '/' });
        setUser(data.user);
    };

    const register = async (userData) => {
        await authService.register(userData);
    };

    const logout = () => {
        authService.logout();
        Cookies.remove('access-token');
        Cookies.remove('user');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };