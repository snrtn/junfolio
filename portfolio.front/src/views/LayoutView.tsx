import React from 'react';
import { Outlet } from 'react-router-dom';

// components
import Header from '../components/navigation/Header';

const LayoutView: React.FC = () => {
	return (
		<div>
			<Header />
			<Outlet />
		</div>
	);
};

export default LayoutView;
