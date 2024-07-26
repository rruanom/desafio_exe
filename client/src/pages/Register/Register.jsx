import React, { useState } from 'react';
import { useAuth } from '../../context/Authcontext';
import LoginGoogle from '../../components/LoginGoogle';

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
            <div>
                <label>First Name:</label>
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </div>
            <div>
                <label>Last Name:</label>
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </div>
            <div>
                <label>Gender</label>
                <select name="" id="" onChange={(e) => setGender(e.target.value)}>
                    <option value={gender}>Female</option>
                    <option value={gender}>Male</option>
                    <option value={gender}>Genderfluid</option>
                    <option value={gender}>Genderqueer</option>
                    <option value={gender}>Polygender</option>
                    <option value={gender}>Agender</option>
                    <option value={gender}>Non-binary</option>
                    <option value={gender}>Bigender</option>
                </select>
            </div>
            <button type="submit">Register</button>
            {message && <p>{message}</p>}
        </form>
        <LoginGoogle />
        </>
    );
};

export default Register;
