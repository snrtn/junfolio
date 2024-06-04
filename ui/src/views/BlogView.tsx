import React, { useState } from 'react';
import BlogLayout from '../components/blog/BlogLayout';
import BlogCard from '../components/blog/BlogCard';
import Pagination from '@mui/material/Pagination';
import { Box } from '@mui/material';
import { styled } from '@mui/system';
import media from '../components/common/mediaQueries';

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

const BlogView = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 8;

	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value);
	};

	return (
		<Container>
			<ContentContainer>
				<BlogLayout>
					{currentPosts.map((post) => (
						<BlogCard
							key={post.title}
							title={post.title}
							description={post.tags.join(', ')}
							imgSrc={post.imgSrc}
							tags={post.tags}
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
