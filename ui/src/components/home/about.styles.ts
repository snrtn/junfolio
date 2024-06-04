import { styled } from '@mui/material/styles';
import media from '../common/mediaQueries';

export const AboutContainer = styled('section')({
	display: 'flex',
	justifyContent: 'center',
	alignItems: 'center',
	height: '60vh',
	padding: '50px 0',
	backgroundColor: '#f9f9f9',
	...media.tabletLarge({
		height: '100%',
		padding: '100px 0',
	}),
});

export const ContentContainer = styled('div')({
	display: 'flex',
	justifyContent: 'space-between',
	alignItems: 'center',
	width: '80%',
	maxWidth: '1200px',
	...media.tabletLarge({
		alignItems: 'normal',
		flexDirection: 'column-reverse',
	}),
});

export const LeftContainer = styled('div')({
	flex: '1',
	paddingRight: '30px',
	...media.tabletLarge({
		paddingRight: '0px',
		paddingLeft: '20px',
	}),
});

export const RightContainer = styled('div')({
	flex: '1',
	textAlign: 'center',
	...media.tabletLarge({
		textAlign: 'left',
		marginBottom: '3rem',
	}),
});

export const Title = styled('h2')({
	fontSize: '1,4rem',
	marginBottom: '20px',
	color: '#1D1D1F',
});

export const Description = styled('p')({
	fontSize: '1rem',
	lineHeight: '1.6',
	color: '#1D1D1F',
});

export const ProfileImage = styled('img')({
	maxWidth: '100%',
	height: 'auto',
	borderRadius: '10px',
	display: 'block',
	...media.tabletLarge({
		height: '35vh',
	}),
});
