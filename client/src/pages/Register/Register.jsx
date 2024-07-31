import React, { useState } from 'react';
import { Card, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import LoginGoogle from '../../components/LoginGoogle';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [gender, setGender] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL || '/api'

    const handleSubmit = async (event) => {
        event.preventDefault();
        setMessage('');
        const registerData = {
            email: email,
            password: password,
            first_name: firstName,
            last_name: lastName,
            gender: gender
        }
        try {
            const response = await fetch(`${API_URL}/candidate/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error durante el registro');
            }

            setMessage('Registro exitoso. Redirigiendo al login...');
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            console.error('Error en el registro:', error);
            setMessage(error.message || 'Error durante el registro');
        }
    };

    return (
        <div className="register-container">
            <Card className="register-card">
                <form onSubmit={handleSubmit}>
                    <h2>Registro</h2>
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
                    <TextField
                        label="Nombre"
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Apellido"
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        fullWidth
                        margin="normal"
                    />
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Género</InputLabel>
                        <Select
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                            label="Género"
                        >
                            <MenuItem value="Female">Femenino</MenuItem>
                            <MenuItem value="Male">Masculino</MenuItem>
                            <MenuItem value="Genderfluid">Género fluido</MenuItem>
                            <MenuItem value="Genderqueer">Género queer</MenuItem>
                            <MenuItem value="Polygender">Polígénero</MenuItem>
                            <MenuItem value="Agender">Agénero</MenuItem>
                            <MenuItem value="Non-binary">No binario</MenuItem>
                            <MenuItem value="Bigender">Bigénero</MenuItem>
                        </Select>
                    </FormControl>
                    <div className="button-container">
                        <Button type="submit" variant="contained" className="register-button">
                            Registrarse
                        </Button>
                    </div>
                    {message && <Typography color={message.includes('exitoso') ? 'primary' : 'error'}>{message}</Typography>}
                </form>
                <LoginGoogle />
            </Card>
        </div>
    );
};

export default Register;