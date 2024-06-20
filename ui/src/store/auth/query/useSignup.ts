import { useMutation, UseMutationOptions, useQueryClient } from '@tanstack/react-query';
import signup from '../api/signup';
import { User, AuthResponse } from '../types';
import { useAuthStore } from '../zustand/useAuthStore';

export const useSignup = (options?: UseMutationOptions<AuthResponse, Error, User>) => {
	const queryClient = useQueryClient();
	const setUser = useAuthStore((state) => state.setUser);
	const setError = useAuthStore((state) => state.setError);

	return useMutation<AuthResponse, Error, User>({
		mutationFn: signup,
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
