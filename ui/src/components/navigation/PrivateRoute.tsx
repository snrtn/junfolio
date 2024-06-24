import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux';

interface PrivateRouteProps {
	redirectPath?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectPath = '/auth' }) => {
	const { token } = useSelector((state: RootState) => state.auth);

	return token ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default PrivateRoute;
