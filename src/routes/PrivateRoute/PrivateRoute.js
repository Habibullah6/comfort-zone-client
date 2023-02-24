import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider';
import DisplayLoading from '../../pages/Shared/DisplayLoading/DisplayLoading';


const PrivateRoute = ({children}) => {
    const location = useLocation();
    
    const {user, loading} = useContext(AuthContext)

    if(loading){
        return <DisplayLoading></DisplayLoading>
    }

    if(user){
        return children;
    }

    return <Navigate to='/login' state={{from: location}} replace/>
        
};

export default PrivateRoute;