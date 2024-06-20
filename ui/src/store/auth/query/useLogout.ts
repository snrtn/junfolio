import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import { useAuthStore } from '../zustand/useAuthStore';

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
	const queryClient = useQueryClient();
	const clearToken = useAuthStore((state) => state.clearToken);
	const token = useAuthStore((state) => state.token);

	return useMutation<void, Error, void>({
		mutationFn: async () => {
			console.log('Attempting to log out. Token:', token); // Log token value
			const response = await apiClient.post(
				'/auth/logout',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				},
			);
			console.log('Logout response:', response);
		},
		onSuccess: () => {
			clearToken();
			queryClient.invalidateQueries({ queryKey: ['auth'] });
		},
		onError: (error) => {
			console.error('Logout failed:', error);
		},
		...options,
	});
};
