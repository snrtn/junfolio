import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import media from '../common/mediaQueries';

export const ContactContainer = styled(Box)(({ theme }) => ({
	height: '80vh',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	background: '#F5F5F7',
	...media.laptopLarge({
		height: '100%',
		padding: '100px 0',
	}),
	'& > div': {
		...media.laptopLarge({
			width: '90%',
			flexWrap: 'wrap',
		}),
		...media.mobileLarge({
			flexDirection: 'column',
		}),
	},
}));

export const Title = styled(Typography)(({ theme }) => ({
	marginBottom: theme.spacing(4),
	textAlign: 'center',
	fontWeight: 500,
}));

export const MapSection = styled(Box)(({ theme }) => ({
	flex: 1,
	height: '400px',
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	flexDirection: 'column',
	...media.mobileLarge({
		paddingBottom: '100px',
	}),
}));

export const SectionImage = styled('img')({
	height: '12rem',
	objectFit: 'cover',
});
