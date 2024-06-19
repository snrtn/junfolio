import apiClient from '../../apiClient';
import { BlogPost } from '../types';

const fetchPosts = async (): Promise<BlogPost[]> => {
	const response = await apiClient.get<BlogPost[]>('/api/blog');
	return response.data;
};

export default fetchPosts;
