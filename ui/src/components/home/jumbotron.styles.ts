import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import media from '../common/mediaQueries';

export const Container = styled(Box)({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: '#fff',
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
	...media.laptopLarge({
		width: '80%',
	}),
	...media.laptopSmall({
		paddingTop: '10rem',
		flexDirection: 'column-reverse',
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
	...media.mobileLarge({
		alignItems: 'center',
		textAlign: 'center',
		padding: '0px 30px',
	}),
});

export const RightSection = styled(Box)({
	flex: 1,
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	...media.mobileLarge({
		alignItems: 'end',
	}),
});

export const Title = styled(Typography)({
	fontSize: '3.8rem',
	fontWeight: 'bold',
	...media.mobileLarge({
		fontSize: '2.6rem',
	}),
});

export const Description = styled(Typography)({
	fontSize: '1.6rem',
	lineHeight: '1.5',
	...media.mobileLarge({
		fontSize: '1.2rem',
	}),
});

export const Image = styled('img')({
	maxWidth: '100%',
	display: 'block',
	...media.laptopSmall({
		maxWidth: '90%',
	}),
	...media.mobileLarge({
		maxWidth: '100%',
	}),
});
