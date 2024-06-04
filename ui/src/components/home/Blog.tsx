import React from 'react';
import { Typography } from '@mui/material';
import { RiArrowRightSLine } from 'react-icons/ri';
import { BlogContainer, BlogHeader, BlogMoreButton, BlogContent, BlogCard, BlogTags, BlogTag } from './blog.styles';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { posts, Post } from '../../data/posts'; // 데이터 가져오기

const Blog: React.FC = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();

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

	const handleCardClick = (post: Post) => {
		navigate(`/blog/${post.id}`, { state: post });
	};

	return (
		<BlogContainer>
			<BlogHeader>
				<div>
					<Typography variant='h5' sx={{ fontWeight: 500 }}>
						{t('home.blog.title') as string}
					</Typography>
					<Typography variant='body2'>{t('home.blog.description') as string}</Typography>
				</div>
				<Link to='blog'>
					<BlogMoreButton variant='outlined' endIcon={<RiArrowRightSLine />}>
						{t('home.blog.button') as string}
					</BlogMoreButton>
				</Link>
			</BlogHeader>
			<BlogContent>
				{posts.map((post, index) => (
					<BlogCard
						key={index}
						onMouseMove={(e) => handleMouseMove(e, index)}
						onMouseLeave={(e) => handleMouseLeave(e, index)}
						onClick={() => handleCardClick(post)}
					>
						<div>
							<BlogTags>
								<BlogTag>{post.tags[0]}</BlogTag>
							</BlogTags>
							<Typography variant='h6'>{post.title}</Typography>
						</div>
						<img src={post.imgSrc} alt={post.title} style={{ display: 'block' }} />
					</BlogCard>
				))}
			</BlogContent>
		</BlogContainer>
	);
};

export default Blog;
