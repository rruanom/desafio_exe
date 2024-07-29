import React, { createContext, useState, useEffect } from 'react';
import authService from '../services/Authservices';
import Cookies from 'js-cookie';
const API_URL = 'https://desafio-exe.onrender.com/api';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [userType, setUserType] = useState(null);
    const [name, setName] = useState(null);
    const [rol, setRol] = useState(null);
    const [status, setStatus] = useState(null);

    const token = Cookies.get('access_token')
    
    useEffect(() => {
        const fetchUser = async () => {
            if (userType == 'candidate'){
                const response = await fetch(`${API_URL}/candidates/me`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ token })
                    }
                )
                setName(user.first_name)
                setStatus(user.status)
            } else if (userType == 'staff'){
                const response = await fetch(`${API_URL}/staff/me`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ token })
                    }
                )
                setName(user.first_name)
                setStatus(user.id_role)
            }
        };
        fetchUser();
    }, [userType]);

};

const useAuth = () => React.useContext(AuthContext);

export { AuthProvider, useAuth };