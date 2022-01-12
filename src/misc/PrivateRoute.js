import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../Contexts/user.context';

const PrivateRoute = () => {
    const {user, isLoading} = useUser();

    return user && !isLoading ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;

