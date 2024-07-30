import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const LoginGoogle = () => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

    return (
        <div className="login-google-container">
            <Button
                href={`/auth/google`}
                variant="outlined"
                startIcon={<GoogleIcon />}
                fullWidth
                className="google-button"
            >
                Iniciar sesión con Google
            </Button>
        </div>
    );
};

export default LoginGoogle;

