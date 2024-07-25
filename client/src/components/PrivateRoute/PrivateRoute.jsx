import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/Authcontext';

const PrivateRoute = ({ children, roles }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (roles && roles.indexOf(user.role) === -1) {
        return <Navigate to="/unauthorized" />;
    }

    return children;
};

export default PrivateRoute;
