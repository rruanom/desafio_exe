import React, { useState } from 'react';
import { useAuth } from '../../context/Authcontext';
import LoginGoogle from '../../components/LoginGoogle';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password);
            window.location.href = '/';
        } catch (error) {
            setMessage(error.message || 'Error durante el login');
        }
    };

    return (
        <>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit">Login</button>
            {message && <p>{message}</p>}
        </form>
        <LoginGoogle />
        </>
    );
};

export default Login;
