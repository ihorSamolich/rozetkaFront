import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAppSelector} from 'hooks/redux';
import {Role} from 'utils/enums';
import {jwtDecode} from 'jwt-decode';
import {IUser} from 'interfaces/account';
import {getLocalStorage} from 'utils/storage/localStorageUtils.ts';

const AdminAuth : React.FC = () => {
    const { user} = useAppSelector((state)=>state.account);
    const { roles } = jwtDecode<IUser>(getLocalStorage('authToken') as string);
    const location = useLocation();

    const isAdmin = (user?.roles === Role.ADMIN || (user?.roles && user.roles.includes(Role.ADMIN))
        || roles === Role.ADMIN || (roles && roles.includes(Role.ADMIN)) );

    return (
        isAdmin
            ? <Outlet />
            : <Navigate to="/notfound" state={{ from: location }} replace />
    );
};

export default AdminAuth;