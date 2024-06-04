import React, { useState } from 'react';
import BlogLayout from '../components/blog/BlogLayout';
import BlogCard from '../components/blog/BlogCard';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import media from '../components/common/mediaQueries';
import { useNavigate } from 'react-router-dom';
import { posts, Post } from '../data/posts'; // 데이터 가져오기

const Container = styled(Box)({
	height: '100vh',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	backgroundSize: 'cover',
	justifyContent: 'space-between',
	...media.desktopLarge({
		height: '100vh',
	}),
	...media.laptopLarge({
		height: '100%',
		padding: '0px 50px 20px 50px',
	}),
});

const ContentContainer = styled(Box)({
	flexGrow: 1,
	width: '100%',
	display: 'flex',
	flexDirection: 'column',
	alignItems: 'center',
	justifyContent: 'center',
	...media.laptopSmall({
		height: '100%',
	}),
});

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

	return (
		<Container>
			<ContentContainer>
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
			</ContentContainer>
			<Pagination
				count={Math.ceil(posts.length / postsPerPage)}
				page={currentPage}
				onChange={handlePageChange}
				sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}
			/>
		</Container>
	);
};

export default BlogView;
