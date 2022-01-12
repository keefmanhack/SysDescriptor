import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { useUser } from '../Contexts/user.context';

const PublicRoute = () => {
    const {user, isLoading} = useUser();

    return user && !isLoading ? <Navigate to="/"/> : <Outlet/>;
}

export default PublicRoute;