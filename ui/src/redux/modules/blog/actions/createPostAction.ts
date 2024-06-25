import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPostApi, Post } from '../index';

export const createPost = createAsyncThunk<Post, Omit<Post, 'id'>>('blog/createPost', async (post) => {
	const response = await createPostApi(post);
	return response;
});
