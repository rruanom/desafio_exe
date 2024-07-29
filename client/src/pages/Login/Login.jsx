import React, { useState } from 'react';
import { Card, TextField, Button, Typography } from '@mui/material';
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
                    {message && <Typography color="error">{message}</Typography>}
                </form>
                <LoginGoogle />
            </Card>
        </div>
    );
};

export default Login;