import { createAsyncThunk } from '@reduxjs/toolkit';
import { updatePostApi, Post } from '../index';

export const updatePost = createAsyncThunk<Post, Post>('blog/updatePost', async (post) => {
	const response = await updatePostApi(post);
	return response;
});
