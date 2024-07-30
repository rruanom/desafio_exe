import React, { useState } from 'react';
import { Card, TextField, Button, Typography, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
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
                    {message && <Typography color="error">{message}</Typography>}
                </form>
                <LoginGoogle />
            </Card>
        </div>
    );
};

export default Register;