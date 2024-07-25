import Cookies from 'js-cookie';

const API_URL = 'https://desafio-exe.onrender.com/api/auth';

const login = async (email, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password_hash: password })
    });
    const data = await response.json();
    if (response.ok) {
        Cookies.set('access-token', data.token);
    }
    return data;
};

const register = async (userData) => {
    const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    return await response.json();
};

const logout = () => {
    Cookies.remove('access-token');
};

const getCurrentUser = async () => {
    const token = Cookies.get('access-token');
    if (token) {
        const response = await fetch(`${API_URL}/me`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response.ok) {
            return (await response.json()).user;
        }
    }
    return null;
};

export default {
    login,
    register,
    logout,
    getCurrentUser,
};