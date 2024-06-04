import React from 'react';
import { Outlet } from 'react-router-dom';

// components
import Header from '../components/navigation/Header';
import Footer from '../components/navigation/Footer';

const LayoutView: React.FC = () => {
	return (
		<div>
			<Header />
			<Outlet />
			<Footer />
		</div>
	);
};

export default LayoutView;
