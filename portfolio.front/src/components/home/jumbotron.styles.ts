import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import media from '../../styles/mediaQueries';

export const Container = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	...media.mobileLarge({
		marginTop: '2rem',
	}),
	...media.mobileSmall({
		marginTop: '0rem',
	}),
});

export const Wrapper = styled(Box)({
	display: 'flex',
	maxWidth: '1200px',
	alignItems: 'center',
	height: '80vh',
	...media.laptopMedium({
		height: '70vh',
	}),
	...media.mobileLarge({
		height: '90vh',
		flexDirection: 'column-reverse',
		padding: '50px 0',
	}),
});

export const LeftSection = styled(Box)({
	flex: 1,
	display: 'flex',
	flexDirection: 'column',
	justifyContent: 'center',
	...media.laptopSmall({
		paddingLeft: '50px',
	}),
	...media.mobileLarge({
		alignItems: 'center',
		textAlign: 'center',
		padding: '20px 30px',
	}),
});

export const RightSection = styled(Box)({
	flex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
});

export const Title = styled(Typography)({
	fontSize: '2.5rem',
	fontWeight: 'bold',
});

export const Description = styled(Typography)({
	fontSize: '1.2rem',
	lineHeight: '1.5',
});

export const Image = styled('img')({
	maxWidth: '100%',
	height: 'auto',
	borderRadius: '10px',
});
