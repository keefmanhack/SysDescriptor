import React from 'react'
import { Navigate, Outlet } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useUser } from '../Contexts/user.context';

const PublicRoute = () => {
    const {user, isLoading} = useUser();

    if(!user && isLoading){
        return(
            <Container>
                <Loader center vertical size="md" content="Loading" speed="slow"/>
            </Container>
        )
    }

    return user && !isLoading ? <Navigate to="/"/> : <Outlet/>;
}

export default PublicRoute;