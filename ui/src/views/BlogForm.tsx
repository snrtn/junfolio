import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {} from '../services/createPostService';
import { Box, TextField, Button, Typography } from '@mui/material';
import { addPost, setStatus, setError } from '../redux/modules/blog/blogSlice';

const BlogForm: React.FC = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const dispatch = useDispatch();
	const createPost = useCreatePost();

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		dispatch(setStatus('loading'));
		createPost.mutate(
			{
				title,
				content,
				author: 'AuthorName',
				tags: ['example'],
				image: '',
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
			{
				onSuccess: (newPost) => {
					dispatch(addPost(newPost));
					dispatch(setStatus('succeeded'));
				},
				onError: (error) => {
					dispatch(setError(error.message));
					dispatch(setStatus('failed'));
				},
			},
		);
	};

	return (
		<Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Typography variant='h4'>Create a New Post</Typography>
			<TextField label='Title' value={title} onChange={(e) => setTitle(e.target.value)} fullWidth required />
			<TextField
				label='Content'
				value={content}
				onChange={(e) => setContent(e.target.value)}
				fullWidth
				multiline
				rows={4}
				required
			/>
			<Button type='submit' variant='contained' color='primary'>
				Submit
			</Button>
		</Box>
	);
};

export default BlogForm;
