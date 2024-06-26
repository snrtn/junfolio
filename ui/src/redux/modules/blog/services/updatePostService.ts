import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostApi, Post } from '../index';

export const useUpdatePost = () => {
	const queryClient = useQueryClient();

	return useMutation<Post, Error, Post>({
		mutationFn: updatePostApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['blog'] });
		},
	});
};
