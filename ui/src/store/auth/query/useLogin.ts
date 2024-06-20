import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import apiClient from '../../apiClient';
import { User, AuthResponse } from '../types';
import { useAuthStore } from '../zustand/useAuthStore';

export const useLogin = (options?: UseMutationOptions<AuthResponse, Error, User>) => {
	const queryClient = useQueryClient();
	const setUser = useAuthStore((state) => state.setUser);
	const setError = useAuthStore((state) => state.setError);
	const setStatus = useAuthStore((state) => state.setStatus);
	const setToken = useAuthStore((state) => state.setToken);

	return useMutation<AuthResponse, Error, User>({
		mutationFn: async (user: User) => {
			const response = await apiClient.post('/auth/login', user, { withCredentials: true });
			setToken(response.data.token);
			return response.data;
		},
		onSuccess: (data) => {
			setUser(data.user);
			setError(null);
			setStatus('authenticated');
			queryClient.invalidateQueries({ queryKey: ['auth'] });
		},
		onError: (error) => {
			setError(error.message);
			setStatus('unauthenticated');
		},
		...options,
	});
};
