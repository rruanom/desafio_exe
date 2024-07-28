import React, { useState } from 'react';
import { useAuth } from '../../../context/Authcontext';

const StaffLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await login(email, password, 'staff');
            window.location.href = '/';
        } catch (error) {
            setMessage(error.message || 'Error durante el login de staff');
        }
    };

    return (
        <div>
            <h2>Login Staff</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login Staff</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default StaffLogin;