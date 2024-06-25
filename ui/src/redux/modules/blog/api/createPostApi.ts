import axiosInstance from '../../axiosInstance';
import { Post } from '../index';

export const createPostApi = async (post: Omit<Post, 'id'>): Promise<Post> => {
	const response = await axiosInstance.post('/posts', post);
	return response.data;
};
