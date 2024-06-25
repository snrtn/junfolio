import axiosInstance from '../../axiosInstance';

export const deletePostApi = async (postId: number): Promise<void> => {
	await axiosInstance.delete(`/posts/${postId}`);
};
