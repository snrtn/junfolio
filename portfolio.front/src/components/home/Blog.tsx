import React from 'react';
import { Typography } from '@mui/material';
import { RiArrowRightSLine } from 'react-icons/ri';
import { BlogContainer, Header, MoreButton, Content, Card, Tags, Tag } from './blog.styles';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Blog = () => {
	const { t } = useTranslation();

	const posts = [
		{
			title: 'Développement',
			tags: ['JavaScript'],
			imgSrc: 'https://source.unsplash.com/1600x900/?javascript,code',
		},
		{
			title: 'Étude',
			tags: ['Education'],
			imgSrc: 'https://source.unsplash.com/1600x900/?education,study',
		},
		{
			title: 'Création de site',
			tags: ['Web Development'],
			imgSrc: 'https://source.unsplash.com/1600x900/?web,development',
		},
		{
			title: 'Divers',
			tags: ['Miscellaneous'],
			imgSrc: 'https://source.unsplash.com/1600x900/?miscellaneous',
		},
		{
			title: 'Programmation',
			tags: ['Coding'],
			imgSrc: 'https://source.unsplash.com/1600x900/?programming,code',
		},
		{
			title: 'Conception',
			tags: ['Graphic Design'],
			imgSrc: 'https://source.unsplash.com/1600x900/?graphic,design',
		},
		{
			title: 'Base de données',
			tags: ['SQL'],
			imgSrc: 'https://source.unsplash.com/1600x900/?database,sql',
		},
		{
			title: 'Cloud',
			tags: ['AWS'],
			imgSrc: 'https://source.unsplash.com/1600x900/?cloud,aws',
		},
	];

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
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

	const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
		const card = e.currentTarget;
		card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
	};

	return (
		<BlogContainer>
			<Header>
				<div>
					<Typography variant='h5' sx={{ fontWeight: 500 }}>
						{t('home.blog.title')}
					</Typography>
					<Typography variant='body2'>{t('home.blog.description')}</Typography>
				</div>
				<Link to='blog'>
					<MoreButton variant='outlined' endIcon={<RiArrowRightSLine />}>
						{t('home.blog.button')}
					</MoreButton>
				</Link>
			</Header>
			<Content>
				{posts.map((post, index) => (
					<Card
						key={index}
						onMouseMove={(e) => handleMouseMove(e, index)}
						onMouseLeave={(e) => handleMouseLeave(e, index)}
					>
						<div>
							<Tags>
								<Tag>{post.tags[0]}</Tag>
							</Tags>
							<Typography variant='h6'>{post.title}</Typography>
						</div>
						<img src={post.imgSrc} alt={post.title} />
					</Card>
				))}
			</Content>
		</BlogContainer>
	);
};

export default Blog;
