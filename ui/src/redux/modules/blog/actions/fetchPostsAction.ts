import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchPostsApi, Post } from '../index';

export const fetchPosts = createAsyncThunk<Post[]>('blog/fetchPosts', async () => {
	const response = await fetchPostsApi();
	return response;
});
