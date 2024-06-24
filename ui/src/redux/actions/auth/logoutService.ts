// src/redux/actions/auth/logoutService.ts
import { useMutation, useQueryClient, MutationFunction } from '@tanstack/react-query';
import { logoutApi } from './logoutApi';

const logoutMutationFn: MutationFunction<void, void> = async () => {
	return logoutApi();
};

export const useLogout = () => {
	const queryClient = useQueryClient();

	return useMutation<void, Error, void>({
		mutationFn: logoutMutationFn,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['auth'] });
		},
	});
};
