import apiClient from '../../apiClient';
import { BlogPost } from '../types';

const createPost = async (post: BlogPost): Promise<BlogPost> => {
	const response = await apiClient.post<BlogPost>('/api/blog', post);
	return response.data;
};

export default createPost;
