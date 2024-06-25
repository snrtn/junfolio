import { createAsyncThunk } from '@reduxjs/toolkit';
import { deletePostApi } from '../index';

export const deletePost = createAsyncThunk<number, number>('blog/deletePost', async (postId) => {
	await deletePostApi(postId);
	return postId;
});
