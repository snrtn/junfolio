import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostApi, Post } from '../index';

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation<Post, Error, Omit<Post, 'id'>>({
		mutationFn: createPostApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});
};
