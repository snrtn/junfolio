import React, { ReactNode } from 'react';
import { Grid, Box } from '@mui/material';
import { styled } from '@mui/system';
import media from '../common/mediaQueries';

interface BlogLayoutProps {
	children: ReactNode;
}

const StyledBox = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: '1200px',
	height: '50vh',
	...media.desktopMedium({
		height: '100%',
		padding: '100px 0',
	}),
}));

const BlogLayout: React.FC<BlogLayoutProps> = ({ children }) => {
	return (
		<StyledBox>
			<Grid container spacing={2}>
				{React.Children.map(children, (child) => (
					<Grid item xs={12} sm={6} md={4} lg={3}>
						{child}
					</Grid>
				))}
			</Grid>
		</StyledBox>
	);
};

export default BlogLayout;
