import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/zustand/useAuthStore';

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const user = useAuthStore((state) => state.user);
	const status = useAuthStore((state) => state.status);

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	if (!user && status !== 'authenticated') {
		return <Navigate to='/auth' />;
	}

	return children;
};

export default PrivateRoute;
