import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth.jsx';

function PrivateRoutes() {
    const { auth } = useAuth(); // Destructure the auth value

    if (auth === undefined) return null; // Return null while waiting for auth check

    return auth ? <Outlet /> : <Navigate to="/auth" />;
}

export default PrivateRoutes;
