import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updatePostApi } from '../index';
import { Post } from '../types/blogTypes';

export const useUpdatePost = () => {
	const queryClient = useQueryClient();

	return useMutation<Post, Error, FormData>({
		mutationFn: updatePostApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['blog'] });
		},
	});
};
