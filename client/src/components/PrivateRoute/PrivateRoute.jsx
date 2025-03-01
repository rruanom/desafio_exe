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
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoute;