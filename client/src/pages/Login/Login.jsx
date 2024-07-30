// Login.jsx
import React, { useState } from 'react';
import LoginGoogle from '../../components/LoginGoogle';
import { Card, TextField, Button, Typography } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/candidate/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();
            login(data); 

            const from = location.state?.from?.pathname || "/";
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="login-container">
            <Card className="login-card">
                <form onSubmit={handleSubmit}>
                    <h2>Iniciar Sesión</h2>
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
                        label="Contraseña"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <div className="button-container">
                    <Button type="submit" variant="contained" className="login-button">
                        Iniciar Sesión
                    </Button>
                    </div>
                    {error && <Typography color="error">{error}</Typography>}
                </form>
                <LoginGoogle />
            </Card>
        </div>
    );
};

export default Login;