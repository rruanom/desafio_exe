import React, { useState } from 'react';
import { TextField, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../../context/Authcontext';

const StaffLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, setUserType } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const API_URL = import.meta.env.VITE_API_URL || '/api'

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`${API_URL}/staff/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            console.log('Staff login response:', data);

            login({
                token: data.token,
                userType: 'staff',
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                id_role: data.user.id_role
            });
            setUserType("staff");

            const from = location.state?.from?.pathname || "/dashboard";
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Staff login error:', error);
            setError(error.message || 'An error occurred during login');
        }
    };

    return (
            <form onSubmit={handleSubmit}>
                <h2>Acceso de Staff</h2>
                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    fullWidth
                    margin="normal"
                />
                <div className="button-container">
                    <Button type="submit" variant="contained" className="login-button">
                        Staff Login
                    </Button>
                </div>
                {error && <Typography color="error">{error}</Typography>}
            </form>
    );
};

export default StaffLogin;