import { styled } from '@mui/system';
import { Box } from '@mui/material';
import media from '../common/mediaQueries';

export const BlogLayoutContainer = styled(Box)(({ theme }) => ({
	width: '100%',
	maxWidth: '1200px',
	height: '50vh',
	...media.desktopMedium({
		height: '100%',
		padding: '100px 0',
	}),
}));
