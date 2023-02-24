import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import DisplayLoading from '../../pages/Shared/DisplayLoading/DisplayLoading';


const AdminRoute = ({children}) => {
    
    
    const {user, loading, userLogout} = useContext(AuthContext)
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    if(loading || isAdminLoading){
        return <DisplayLoading></DisplayLoading>
    }

    if(user && isAdmin){
        return children;
    }

    return userLogout()
        
};

export default AdminRoute;