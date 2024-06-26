import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AiFillEdit, AiFillDelete } from 'react-icons/ai';
import useBlog from '../hooks/useBlog';
import { Post } from '../interfaces';
import { BlogForm, EditModal, DeleteModal, ContentModal, ImageModal } from '../components';

const DashboardView = () => {
	const { posts, updatePost, deletePost, status, error } = useBlog();
	const [selectedPost, setSelectedPost] = useState<Post | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isContentModalOpen, setIsContentModalOpen] = useState(false);
	const [isImageModalOpen, setIsImageModalOpen] = useState(false);

	const handleEditClick = (post: Post) => {
		setSelectedPost(post);
		setIsEditModalOpen(true);
	};

	const handleDeleteClick = (post: Post) => {
		setSelectedPost(post);
		setIsDeleteModalOpen(true);
	};

	const handleContentClick = (post: Post) => {
		setSelectedPost(post);
		setIsContentModalOpen(true);
	};

	const handleImageClick = (post: Post) => {
		setSelectedPost(post);
		setIsImageModalOpen(true);
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
		{
			field: 'content',
			headerName: 'Content',
			width: 200,
			renderCell: (params) => (
				<Typography onClick={() => handleContentClick(params.row)} style={{ cursor: 'pointer', color: 'blue' }}>
					{params.row.content.toString().substring(0, 20)}...
				</Typography>
			),
		},
		{
			field: 'image',
			headerName: 'Image',
			width: 300,
			renderCell: (params) => (
				<img
					src={params.row.image}
					alt='post'
					onClick={() => handleImageClick(params.row)}
					style={{ cursor: 'pointer', maxHeight: 50 }}
				/>
			),
		},
		{
			field: 'actions',
			headerName: 'Actions',
			width: 200,
			renderCell: (params) => (
				<>
					<Button onClick={() => handleEditClick(params.row)}>
						<AiFillEdit />
					</Button>
					<Button onClick={() => handleDeleteClick(params.row)}>
						<AiFillDelete />
					</Button>
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
			<EditModal
				isOpen={isEditModalOpen}
				onClose={() => setIsEditModalOpen(false)}
				post={selectedPost}
				onSubmit={handleEditSubmit}
				onChange={(field, value) => setSelectedPost({ ...selectedPost!, [field]: value })}
			/>
			<DeleteModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onSubmit={handleDeleteSubmit}
			/>
			<ContentModal
				isOpen={isContentModalOpen}
				onClose={() => setIsContentModalOpen(false)}
				content={selectedPost?.content || ''}
			/>
			<ImageModal
				isOpen={isImageModalOpen}
				onClose={() => setIsImageModalOpen(false)}
				imageSrc={selectedPost?.image || ''}
			/>
		</Box>
	);
};

export default DashboardView;
