import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import media from '../common/mediaQueries';
import { FaMoon, FaSun } from 'react-icons/fa6';

export const Container = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	background: '#fff',
}));
export const Wrapper = styled(Box)(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	width: '80%',
	maxWidth: '1200px',
	textAlign: 'center',
	flexWrap: 'wrap',
	margin: '5rem 0',
	gap: '20px',
	justifyContent: 'space-between',
	...media.desktopLarge({
		alignItems: 'center',
		justifyContent: 'center',
		gap: '40px',
	}),
}));

export const ServiceCardContainer = styled(Box)(({ theme }) => ({
	width: '24rem',
	height: '43rem',
	padding: '40px 35px',
	boxSizing: 'border-box',
	background: '#fff',
	borderRadius: '7px',
	boxShadow: '0 0 10px rgba(0, 0, 0, 0.15)',
	textAlign: 'center',
	position: 'relative',
	display: 'inline-block',
	transition: '0.5s',
	backgroundColor: '#F5F5F7',
	scrollSnapAlign: 'center',
	'&.dark': {
		backgroundColor: '#222f3e',
		color: '#F5F5F7',
	},
	'& h6': {
		fontSize: '24px',
		fontWeight: 'normal',
		marginBottom: '10px',
	},
	...media.desktopLarge({
		padding: '40px 30px',
	}),
	...media.desktopSmall({
		margin: '20px',
		height: '40rem',
	}),
	...media.laptopLarge({
		width: '22rem !important',
		height: '36rem',
		margin: '20px',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	}),
	...media.laptopSmall({
		width: '30rem !important',
		height: '36rem',
		display: 'flex',
		padding: '20px 50px',
	}),
	...media.mobileLarge({
		width: '30rem !important',
		margin: '20px 0',
		padding: '20px 30px',
		textAlign: 'left',
	}),
	...media.mobileSmall({
		height: '35rem',
	}),
}));

export const Face = styled(Box)(({ theme }) => ({
	width: '300px',
	height: '300px',
	margin: '0 auto',
	position: 'relative',
	'& img': {
		width: '100%',
		height: '100%',
	},
	...media.laptopLarge({
		width: '260px',
		height: '200px',
	}),
	...media.tabletLarge({
		width: '220px',
		height: '180px',
	}),
	...media.mobileLarge({
		width: '180px',
		height: '180px',
	}),
}));

export const SunIcon = styled(FaSun)(({ theme }) => ({
	fontSize: '24px',
	color: 'orange',
}));

export const MoonIcon = styled(FaMoon)(({ theme }) => ({
	fontSize: '24px',
	color: 'orange',
}));

export const ToggleButtonContainer = styled(Box)(({ theme }) => ({
	position: 'absolute',
	top: '20px',
	left: '20px',
}));
