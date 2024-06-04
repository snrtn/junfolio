import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { styled } from '@mui/system';
import { posts } from '../data/posts';
import media from '../components/common/mediaQueries';

const OverlayContainer = styled(Box)({
	position: 'fixed',
	top: 0,
	left: 0,
	width: '100vw',
	height: '90vh',
	backgroundColor: '#fff',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	zIndex: 999,
	color: '#000',
	padding: '20px',
	boxSizing: 'border-box',
	...media.mobileLarge({
		maxWidth: '100% !important',
		width: '100% !important',
		padding: '20px',
	}),
});

const BackButtonContainer = styled(Box)({
	width: '600px',
	marginBottom: '100px',
	...media.mobileLarge({
		maxWidth: '100% !important',
		width: '100% !important',
		marginBottom: '50px',
	}),
});

const ContentContainer = styled(Box)({
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'left',
	textAlign: 'left',
	maxWidth: '600px',
	margin: '0 auto',
	...media.mobileLarge({
		maxWidth: '100% !important',
		width: '100% !important',
	}),
});

const ImageContainer = styled(Box)({
	width: '100%',
});

const BlogPageView: React.FC = () => {
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id as string;

	const postId = parseInt(id, 10);
	const post = posts.find((p) => p.id === postId);

	if (!post) {
		navigate('/notfound');
		return null;
	}

	const { title, tags, imgSrc, content } = post;

	return (
		<OverlayContainer>
			<BackButtonContainer>
				<IconButton onClick={() => navigate(-1)} color='inherit'>
					<RiArrowLeftLine size={24} />
				</IconButton>
			</BackButtonContainer>
			<ContentContainer>
				<Typography variant='body1' gutterBottom>
					{tags.join(', ')}
				</Typography>
				<Typography variant='h4' component='h1' gutterBottom>
					{title}
				</Typography>
				<Typography variant='body1' gutterBottom>
					{content}
				</Typography>
				<ImageContainer>
					<img src={imgSrc} alt={title} style={{ maxWidth: '100%', maxHeight: '400px' }} />
				</ImageContainer>
			</ContentContainer>
		</OverlayContainer>
	);
};

export default BlogPageView;
