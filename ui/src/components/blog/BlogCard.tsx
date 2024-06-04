import React from 'react';
import { styled, Box, Typography } from '@mui/material';
import media from '../common/mediaQueries';

const Card = styled(Box)(({ theme }) => ({
	backgroundColor: '#fff',
	borderRadius: theme.shape.borderRadius,
	cursor: 'pointer',
	transition: 'transform 0.3s, filter 0.3s',
	transform: 'perspective(1000px) rotateY(0deg) rotateX(0deg)',
	filter: 'brightness(1) contrast(1)',
	position: 'relative',
	overflow: 'hidden',
	height: '18rem',
	display: 'flex',
	flexDirection: 'column',
	'& img': {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
		marginBottom: theme.spacing(2),
	},
	'& > div': {
		padding: '10px 20px 0px 20px',
		...media.mobileLarge({
			padding: '10px',
		}),
	},

	'& h6': {
		overflow: 'hidden',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		...media.mobileLarge({
			fontSize: '1rem !important',
		}),
	},

	'&:before': {
		content: '""',
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
		background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(0, 0, 0, 0.1))',
		mixBlendMode: 'overlay',
		transition: 'opacity 0.3s',
		opacity: 0,
	},
	'&:hover': {
		filter: 'brightness(1.1) contrast(1.1)',
		boxShadow: theme.shadows[6],
		'&:before': {
			opacity: 1,
		},
	},
}));

const Tags = styled(Box)(({ theme }) => ({
	display: 'flex',
	flexWrap: 'wrap',
	gap: theme.spacing(1),
	marginTop: theme.spacing(1),
}));

const Tag = styled(Box)(({ theme }) => ({
	backgroundColor: 'orange',
	color: theme.palette.primary.contrastText,
	borderRadius: theme.shape.borderRadius,
	padding: theme.spacing(0.5, 1),
	fontSize: '0.875rem',
	overflow: 'hidden',
	whiteSpace: 'nowrap',
	textOverflow: 'ellipsis',
}));

interface BlogCardProps {
	title: string;
	description: string;
	imgSrc: string;
	tags: string[];
}

const BlogCard: React.FC<BlogCardProps> = ({ title, description, imgSrc, tags }) => {
	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = e.currentTarget;
		const rect = card.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;
		const centerX = rect.width / 2;
		const centerY = rect.height / 2;
		const rotateX = ((y - centerY) / centerY) * 12;
		const rotateY = ((x - centerX) / centerX) * -12;
		card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
	};

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
		const card = e.currentTarget;
		card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
	};

	return (
		<Card onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
			<div>
				<Tags>
					{tags.map((tag) => (
						<Tag key={tag}>{tag}</Tag>
					))}
				</Tags>
				<Typography variant='h6'>{title}</Typography>
			</div>
			<img src={imgSrc} alt={title} />
		</Card>
	);
};

export default BlogCard;
