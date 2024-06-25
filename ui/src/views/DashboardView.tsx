import React, { useState } from 'react';
import BlogForm from './BlogForm';
import { Box, Button, Modal, Typography, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import useBlog from '../hooks/useBlog';
import { Post } from '../interfaces';

const DashboardView = () => {
	const { posts, updatePost, deletePost, status, error } = useBlog();
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const handleEditClick = (post: Post) => {
		setSelectedPost(post);
		setIsEditModalOpen(true);
	};

	const handleDeleteClick = (post: Post) => {
		setSelectedPost(post);
		setIsDeleteModalOpen(true);
	};

	const handleEditSubmit = () => {
		if (selectedPost) {
			updatePost(selectedPost);
			setIsEditModalOpen(false);
		}
	};

	const handleDeleteSubmit = () => {
		if (selectedPost) {
			deletePost(selectedPost.id);
			setIsDeleteModalOpen(false);
		}
	};

	const columns: GridColDef[] = [
		{ field: 'title', headerName: 'Title', width: 200 },
		{ field: 'author.username', headerName: 'Author', width: 150 },
		{ field: 'createdAt', headerName: 'Created At', width: 150 },
		{
			field: 'actions',
			headerName: 'Actions',
			width: 150,
			renderCell: (params) => (
				<>
					<Button onClick={() => handleEditClick(params.row)}>Edit</Button>
					<Button onClick={() => handleDeleteClick(params.row)}>Delete</Button>
				</>
			),
		},
	];

	return (
		<Box sx={{ margin: '100px 20px 20px 20px' }}>
			<BlogForm />
			<Box sx={{ height: 400, width: '100%', marginTop: '20px' }}>
				{status === 'loading' && <Typography>Loading...</Typography>}
				{status === 'failed' && <Typography color='error'>{error}</Typography>}
				{status === 'succeeded' && (
					<DataGrid
						rows={posts}
						columns={columns}
						getRowId={(row) => row._id} // _id를 id로 사용
					/>
				)}
			</Box>
			<Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
				<Box sx={{ padding: '20px', backgroundColor: 'white', margin: '100px auto', width: '300px' }}>
					<Typography variant='h6'>Edit Post</Typography>
					<TextField
						label='Title'
						value={selectedPost?.title || ''}
						onChange={(e) => setSelectedPost({ ...selectedPost!, title: e.target.value })}
						fullWidth
						required
					/>
					<TextField
						label='Content'
						value={selectedPost?.content || ''}
						onChange={(e) => setSelectedPost({ ...selectedPost!, content: e.target.value })}
						fullWidth
						multiline
						rows={4}
						required
					/>
					<Button onClick={handleEditSubmit}>Save</Button>
				</Box>
			</Modal>
			<Modal open={isDeleteModalOpen} onClose={() => setIsDeleteModalOpen(false)}>
				<Box sx={{ padding: '20px', backgroundColor: 'white', margin: '100px auto', width: '300px' }}>
					<Typography variant='h6'>Delete Post</Typography>
					<Typography>Are you sure you want to delete this post?</Typography>
					<Button onClick={handleDeleteSubmit}>Yes</Button>
					<Button onClick={() => setIsDeleteModalOpen(false)}>No</Button>
				</Box>
			</Modal>
		</Box>
	);
};

export default DashboardView;
