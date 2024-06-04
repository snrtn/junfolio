import React from 'react';
import { Typography, IconButton } from '@mui/material';
import { RiArrowLeftLine } from 'react-icons/ri';
import { useNavigate, useParams } from 'react-router-dom';
import { posts } from '../data/posts';
import {
	BlogPageOverlayContainer,
	BlogPageBackButtonContainer,
	BlogPageContentContainer,
	BlogPageImageContainer,
} from './BlogPageView.styles';

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
		<BlogPageOverlayContainer>
			<BlogPageBackButtonContainer>
				<IconButton onClick={() => navigate(-1)} color='inherit'>
					<RiArrowLeftLine size={24} />
				</IconButton>
			</BlogPageBackButtonContainer>
			<BlogPageContentContainer>
				<Typography variant='body1' gutterBottom>
					{tags.join(', ')}
				</Typography>
				<Typography variant='h4' component='h1' gutterBottom>
					{title}
				</Typography>
				<Typography variant='body1' gutterBottom>
					{content}
				</Typography>
				<BlogPageImageContainer>
					<img src={imgSrc} alt={title} style={{ maxWidth: '100%', maxHeight: '400px' }} />
				</BlogPageImageContainer>
			</BlogPageContentContainer>
		</BlogPageOverlayContainer>
	);
};

export default BlogPageView;
