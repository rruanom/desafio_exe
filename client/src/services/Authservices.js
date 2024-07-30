
import Cookies from 'js-cookie';
const API_URL = import.meta.env.VITE_API_URL || '/api'

const candidateLogin = async (email, password) => {
    const response = await fetch(`${API_URL}/candidate/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });
    const data = await response.json();
    if (response.ok) {
        Cookies.set('access-token', data.token);
    }
    return data;
};

const candidateRegister = async (userData) => {
    const response = await fetch(`${API_URL}/candidates/add`, {
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

const getCurrentCandidate = async () => {
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
    candidateLogin,
    candidateRegister,
    logout,
    getCurrentCandidate,
};