// src/redux/modules/blog/useCreatePost.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createPostApi } from '../index'; // Updated to use the correct import path

export const useCreatePost = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: createPostApi, // Correctly use the mutation function
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['blog'] });
		},
	});
};
