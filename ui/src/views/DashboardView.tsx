import React from 'react';
import BlogForm from '../components/BlogForm'; // BlogForm 컴포넌트 임포트
import { Box } from '@mui/material';

const DashboardView = () => {
	return (
		<Box sx={{ margin: '20px' }}>
			<BlogForm />
		</Box>
	);
};

export default DashboardView;
