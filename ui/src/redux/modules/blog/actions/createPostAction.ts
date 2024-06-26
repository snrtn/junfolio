// src/redux/modules/blog/createPost.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { createPostApi, Post } from '../index';

export const createPost = createAsyncThunk<Post, FormData>('blog/createPost', async (formData) => {
	const response = await createPostApi(formData);
	return response;
});
