import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import media from '../../styles/mediaQueries'; // media 객체를 가져오는 경로로 변경하세요
import { FaMoon, FaSun } from 'react-icons/fa6';

export const Container = styled(Box)(({ theme }) => ({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '100%',
	width: '100%',
	textAlign: 'center',
	flexWrap: 'wrap',
	margin: '5rem 0',
}));

export const ServiceCardContainer = styled(Box)(({ theme }) => ({
	width: '30rem',
	height: '42rem',
	padding: '50px 30px',
	boxSizing: 'border-box',
	background: '#fff',
	borderRadius: '7px',
	boxShadow: '0 0 20px rgba(0, 0, 0, 0.15)',
	textAlign: 'center',
	position: 'relative',
	display: 'inline-block',
	margin: '20px',
	transition: '0.5s',
	backgroundColor: '#F5F5F7',
	scrollSnapAlign: 'center',
	'&.dark': {
		backgroundColor: '#222f3e',
		color: '#F5F5F7',
	},
	'& h6': {
		fontSize: '26px',
		fontWeight: 'normal',
		lineHeight: '1.2em',
		marginBottom: 0,
		'& p': {
			display: 'block',
			fontSize: '13px',
			color: '#bbb',
			textTransform: 'uppercase',
		},
	},
	'& p': {
		marginTop: '5px',
		marginBottom: '10px',
		'& span': {
			display: 'block',
			color: 'royalblue',
		},
	},
	...media.desktopSmall({
		width: '22rem',
		height: '38rem',
		padding: '40px 20px',
	}),
	...media.laptopLarge({
		width: '20rem',
		height: '38rem',
		padding: '40px 25px',
	}),
	...media.laptopSmall({
		height: '30rem',
		padding: '20px 10px',
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
