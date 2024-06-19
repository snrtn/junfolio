import { useMutation, useQueryClient, UseMutationOptions } from '@tanstack/react-query';
import signup from './api/signup';
import login from './api/login';
import logout from './api/logout';
import { User, AuthResponse } from './types';

export const useSignup = (options?: UseMutationOptions<AuthResponse, Error, User>) => {
	const queryClient = useQueryClient();
	return useMutation<AuthResponse, Error, User>({
		mutationFn: signup,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['auth'] });
		},
		...options,
	});
};

export const useLogin = (options?: UseMutationOptions<AuthResponse, Error, User>) => {
	const queryClient = useQueryClient();
	return useMutation<AuthResponse, Error, User>({
		mutationFn: login,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['auth'] });
		},
		...options,
	});
};

export const useLogout = (options?: UseMutationOptions<AuthResponse, Error, void>) => {
	const queryClient = useQueryClient();
	return useMutation<AuthResponse, Error, void>({
		mutationFn: logout,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['auth'] });
		},
		...options,
	});
};
