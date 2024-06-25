import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, Autocomplete, Chip } from '@mui/material';
import { useBlog } from '../hooks';
import useAuth from '../hooks/useAuth';
import { Post } from '../interfaces';

const BlogForm: React.FC = () => {
	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [tags, setTags] = useState<string[]>([]);
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const { createPost, status, error } = useBlog();
	const { user } = useAuth(); // 현재 로그인된 사용자 정보 가져오기

	useEffect(() => {
		if (image) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
			};
			reader.readAsDataURL(image);
		} else {
			setImagePreview(null);
		}
	}, [image]);

	useEffect(() => {
		console.log('Current User:', user);
	}, [user]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!user) {
			alert('로그인한 사용자가 없습니다.');
			return;
		}

		const newPost: Omit<Post, 'id'> = {
			title,
			content,
			tags,
			image: image ? URL.createObjectURL(image) : '',
			author: user._id, // 동적으로 로그인한 사용자 ID 사용
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
		};

		console.log(newPost);

		createPost(newPost);
	};

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files && e.target.files[0]) {
			setImage(e.target.files[0]);
		} else {
			setImage(null);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
	};

	return (
		<Box component='form' onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
			<Typography variant='h4'>Create a New Post</Typography>
			{status === 'loading' && <Typography>Loading...</Typography>}
			{status === 'failed' && <Typography color='error'>{error}</Typography>}
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
			<Autocomplete
				multiple
				freeSolo
				options={[]}
				value={tags}
				onChange={(event, newValue) => setTags(newValue as string[])}
				renderTags={(value: readonly string[], getTagProps) =>
					value.map((option: string, index: number) => {
						const tagProps = getTagProps({ index });
						return (
							<Chip
								key={tagProps.key}
								variant='outlined'
								label={option}
								className={tagProps.className}
								disabled={tagProps.disabled}
								data-tag-index={tagProps['data-tag-index']}
								tabIndex={tagProps.tabIndex}
								onDelete={tagProps.onDelete}
							/>
						);
					})
				}
				renderInput={(params) => <TextField {...params} variant='outlined' label='Tags' placeholder='Add tags' />}
			/>
			<Button variant='contained' component='label'>
				Upload Image
				<input type='file' hidden accept='image/*' onChange={handleImageChange} />
			</Button>
			{imagePreview && (
				<Box sx={{ mt: 2, textAlign: 'center' }}>
					<img src={imagePreview} alt='Preview' style={{ maxWidth: '100%', maxHeight: 200 }} />
					<Button variant='contained' color='secondary' onClick={handleRemoveImage} sx={{ mt: 1 }}>
						Remove Image
					</Button>
				</Box>
			)}
			<Button type='submit' variant='contained' color='primary'>
				Submit
			</Button>
		</Box>
	);
};

export default BlogForm;
