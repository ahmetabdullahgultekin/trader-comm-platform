import React from 'react';
import {Navigate} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {RouteKey} from '../../types/enums';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({children}) => {
    const {user, loading} = useAuth();

    if (loading) {
        return <LoadingSpinner fullScreen message="Yetki kontrol ediliyor..."/>;
    }

    if (!user) {
        return <Navigate to={RouteKey.HOME} replace/>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;