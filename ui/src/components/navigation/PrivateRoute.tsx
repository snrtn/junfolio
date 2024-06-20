import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../../store/auth/useAuthStore';

interface PrivateRouteProps {
	children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
	const user = useAuthStore((state) => state.user);
	const status = useAuthStore((state) => state.status);
	const initializeAuth = useAuthStore((state) => state.initializeAuth);

	useEffect(() => {
		initializeAuth();
	}, [initializeAuth]);

	if (status === 'loading') {
		return <div>Loading...</div>;
	}

	// if (!user) {
	// 	return <Navigate to='/auth' />;
	// }

	return children;
};

export default PrivateRoute;
