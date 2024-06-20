import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import apiClient from '../apiClient';
import { User, AuthResponse } from './types';
import { useAuthStore } from './useAuthStore';

export const useSignup = (options?: UseMutationOptions<AuthResponse, Error, User>) => {
	const queryClient = useQueryClient();
	const setUser = useAuthStore((state) => state.setUser);
	const setError = useAuthStore((state) => state.setError);

	return useMutation<AuthResponse, Error, User>({
		mutationFn: async (user: User) => {
			const response = await apiClient.post('/auth/signup', user);
			return response.data;
		},
		onSuccess: (data) => {
			setUser(data.user);
			setError(null);
			queryClient.invalidateQueries({ queryKey: ['auth'] });
		},
		onError: (error) => {
			setError(error.message);
		},
		...options,
	});
};

export const useLogin = (options?: UseMutationOptions<AuthResponse, Error, User>) => {
	const queryClient = useQueryClient();
	const setUser = useAuthStore((state) => state.setUser);
	const setError = useAuthStore((state) => state.setError);
	const setStatus = useAuthStore((state) => state.setStatus);

	return useMutation<AuthResponse, Error, User>({
		mutationFn: async (user: User) => {
			setStatus('loading');
			const response = await apiClient.post('/auth/login', user, { withCredentials: true });
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

export const useLogout = (options?: UseMutationOptions<void, Error, void>) => {
	const queryClient = useQueryClient();
	const clearToken = useAuthStore((state) => state.clearToken);

	return useMutation<void, Error, void>({
		mutationFn: async () => {
			const token = localStorage.getItem('token');
			console.log('Logging out with token:', token);
			if (!token) {
				throw new Error('No token found');
			}
			await apiClient.post(
				'/auth/logout',
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				},
			);
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
