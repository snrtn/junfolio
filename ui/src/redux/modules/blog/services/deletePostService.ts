import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deletePostApi } from '../index';

export const useDeletePost = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, number>({
		mutationFn: deletePostApi,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
	});
};
