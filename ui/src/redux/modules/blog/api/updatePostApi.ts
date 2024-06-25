import axiosInstance from '../../axiosInstance';
import { Post } from '../types/blogTypes';

export const updatePostApi = async (post: Post): Promise<Post> => {
	const response = await axiosInstance.put(`/blog/${post.id}`, post);
	return response.data;
};
