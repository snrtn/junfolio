import apiClient from '../../apiClient';
import { BlogPost } from '../types';

const fetchPostById = async (id: string): Promise<BlogPost> => {
	const response = await apiClient.get<BlogPost>(`/api/blog/${id}`);
	return response.data;
};

export default fetchPostById;
