import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import {Container, Loader} from 'rsuite';
import { useUser } from '../Contexts/user.context';

const PrivateRoute = () => {
    const {user, isLoading} = useUser();

    if(!user && isLoading){
        return(
            <Container>
                <Loader center vertical size="md" content="Loading" speed="slow"/>
            </Container>
        )
    }

    return user && !isLoading ? <Outlet /> : <Navigate to="/signin" />;
}

export default PrivateRoute;

