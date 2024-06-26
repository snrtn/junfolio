// src/redux/modules/blog/api.ts
import axiosInstance from '../../axiosInstance';
import { Post } from '../index';

export const createPostApi = async (formData: FormData): Promise<Post> => {
	const response = await axiosInstance.post('/blog', formData, {
		headers: {
			'Content-Type': 'multipart/form-data',
		},
	});
	return response.data;
};
