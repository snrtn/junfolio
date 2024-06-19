import apiClient from '../../apiClient';

const deletePost = async (id: string): Promise<void> => {
	await apiClient.delete(`/api/blog/${id}`);
};

export default deletePost;
