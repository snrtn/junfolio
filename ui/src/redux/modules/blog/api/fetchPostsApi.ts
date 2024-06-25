import axiosInstance from '../../axiosInstance';
import { Post } from '../types/blogTypes';

export const fetchPostsApi = async (): Promise<Post[]> => {
	const response = await axiosInstance.get('/posts');
	return response.data;
};
