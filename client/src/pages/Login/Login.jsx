// Login.jsx
import React, { useState } from 'react';
import LoginGoogle from '../../components/LoginGoogle';
import { Card, TextField, Button, Typography, Tabs, Tab } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext'; 
import StaffLogin from './StaffLogin';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isStaff, setIsStaff] = useState(false);
    const { login, setUserType } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch(`http://localhost:5000/api/candidate/login`, {
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
            login(data); 
            setUserType("candidate");
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            setError(error.message || 'An error occurred during login');
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <Tabs
                    value={isStaff ? 1 : 0}
                    onChange={(e, newValue) => setIsStaff(newValue === 1)}
                    centered
                >
                    <Tab label="Candidatos" />
                    <Tab label="Staff" />
                </Tabs>
                {isStaff ? (
                    <StaffLogin />
                ) : (
                    <>
                        <form onSubmit={handleSubmit}>
                            <h2>Acceso de Candidatos</h2>
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
                                    Login
                                </Button>
                            </div>
                            {error && <Typography color="error">{error}</Typography>}
                        </form>
                        <LoginGoogle />
                    </>
                )}
            </Card>
        </div>
    );
};

export default Login;