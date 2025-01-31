import React from 'react';
import { Button } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

const LoginGoogle = () => {
    return (
        <div className="login-google-container">
            <Button
                href={`${import.meta.env.VITE_API_URL}/auth/google`}
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
