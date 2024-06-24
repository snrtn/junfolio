// src/redux/actions/auth/loginService.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { loginApi } from './loginApi';
import { LoginData } from '../../../interfaces/auth';

interface LoginResponse {
	token: string;
}

export const useLogin = () => {
	const queryClient = useQueryClient();

	return useMutation<LoginResponse, Error, LoginData>({
		mutationFn: (data: LoginData) => loginApi(data.username, data.password),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ['auth'] });
		},
	});
};
