import apiClient from '../../apiClient';
import { BlogPost } from '../types';

const updatePost = async (id: string, post: BlogPost): Promise<BlogPost> => {
	const response = await apiClient.put<BlogPost>(`/api/blog/${id}`, post);
	return response.data;
};

export default updatePost;
