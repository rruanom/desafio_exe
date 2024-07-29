// PrivateRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const PrivateRoute = ({ children }) => {
    const { token, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!token) {
        // Redirige a login, pero guarda la ubicación actual para redirigir de vuelta después del login
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;