import React, { useState, useEffect } from 'react';
import { BlogCard, BlogLayout } from '../components';

import { useNavigate } from 'react-router-dom';

import Pagination from '@mui/material/Pagination';
import { BlogContainer, BlogContentContainer } from './blogView.styles';

import { posts, Post } from '../data/posts';

const BlogView: React.FC = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 8;
	const navigate = useNavigate();

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	const handleCardClick = (post: Post) => {
		navigate(`/blog/${post.id}`, { state: post });
	};

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<BlogContainer>
			<BlogContentContainer>
				<BlogLayout>
					{currentPosts.map((post) => (
						<BlogCard
							key={post.id}
							title={post.title}
							imgSrc={post.imgSrc}
							tags={post.tags}
							onClick={() => handleCardClick(post)}
						/>
					))}
				</BlogLayout>
			</BlogContentContainer>
			<Pagination
				count={Math.ceil(posts.length / postsPerPage)}
				page={currentPage}
				onChange={handlePageChange}
				sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
			/>
		</BlogContainer>
	);
};

export default BlogView;
