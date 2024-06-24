// src/hooks/useAuth.ts
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { UseAuth } from '../interfaces/auth';
import { useLogin, useLogout } from '../redux/actions/auth';
import { setToken, clearToken, setStatus, setError } from '../redux/slices/authSlice';
import { useEffect } from 'react';
import { getCookie } from '../redux/actions/auth/authCookie';

const useAuth = (): UseAuth => {
	const dispatch = useDispatch<AppDispatch>();
	const { token, status, error } = useSelector((state: RootState) => state.auth);

	const { mutate: login } = useLogin();
	const { mutate: logout } = useLogout();

	useEffect(() => {
		const savedToken = getCookie('accessToken');
		console.log('Saved Token from Cookie:', savedToken); // Debugging log
		if (savedToken) {
			dispatch(setToken(savedToken));
		}
	}, [dispatch]);

	return {
		login: (username: string, password: string) => {
			login(
				{ username, password },
				{
					onSuccess: () => {
						const newToken = getCookie('accessToken');
						if (newToken) {
							dispatch(setToken(newToken));
							dispatch(setStatus('succeeded'));
						}
					},
					onError: () => {
						dispatch(setError('Login failed'));
						dispatch(setStatus('failed'));
					},
				},
			);
		},
		logout: () => {
			logout(undefined, {
				onSuccess: () => {
					dispatch(clearToken());
					dispatch(setStatus('idle'));
				},
				onError: () => {
					dispatch(setError('Logout failed'));
				},
			});
		},
		token,
		authStatus: status,
		authError: error,
	};
};

export default useAuth;
