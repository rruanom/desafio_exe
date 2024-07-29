// StaffLogin.jsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const StaffLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await fetch('http://localhost:5000/api/staff/login', {
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
            console.log('Staff login response:', data); // Para depuración

            // Llamamos a la función login del contexto con los datos del staff
            login({
                token: data.token,
                userType: 'staff',
                first_name: data.user.first_name,
                last_name: data.user.last_name,
                email: data.user.email,
                id_role: data.user.id_role
            });

            // Redirigimos al usuario a la página que intentaba acceder o al dashboard del staff
            const from = location.state?.from?.pathname || "/staff-dashboard";
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Staff login error:', error);
            setError(error.message || 'An error occurred during login');
        }
    };

    return (
        <div className="staff-login-container">
            <h2>Staff Login</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">Login as Staff</button>
            </form>
        </div>
    );
};

export default StaffLogin;