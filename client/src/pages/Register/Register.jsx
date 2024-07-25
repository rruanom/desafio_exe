import React, { useState } from 'react';
import { useAuth } from '../../context/Authcontext';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');
    const { register } = useAuth();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await register({
                email,
                password_hash: password,
                first_name: firstName,
                last_name: lastName,
                gender
            });
            window.location.href = '/login';
        } catch (error) {
            setMessage(error.message || 'Error durante el registro');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div>
                <label>Gender (if candidate):</label>
                <input type="text" value={gender} onChange={(e) => setGender(e.target.value)} />
            </div>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Register;
