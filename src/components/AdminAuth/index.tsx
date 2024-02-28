import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAppSelector} from 'hooks/redux';
import {Role} from 'utils/enums';

const AdminAuth : React.FC = () => {
    const { user} = useAppSelector((state)=>state.account);
    const location = useLocation();

    return (
        user?.role === Role.ADMIN
            ? <Outlet />
            : <Navigate to="/notfound" state={{ from: location }} replace/>
    );
};

export default AdminAuth;