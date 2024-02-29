import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import {useAppSelector} from 'hooks/redux';
import {Role} from 'utils/enums';
import {jwtDecode} from 'jwt-decode';
import {IUser} from 'interfaces/account';
import {getLocalStorage} from 'utils/storage/localStorageUtils.ts';

const AdminAuth : React.FC = () => {
    const { user} = useAppSelector((state)=>state.account);
    const { role } = jwtDecode<IUser>(getLocalStorage('authToken') as string);
    const location = useLocation();

    return (
        (role || user?.role) === Role.ADMIN
            ? <Outlet />
            : <Navigate to="/notfound" state={{ from: location }} replace />
    );
};

export default AdminAuth;