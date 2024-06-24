import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	RootState,
	AppDispatch,
	useLogin,
	useLogout,
	getCookie,
	clearToken,
	setToken,
	setStatus,
	setError,
} from '../redux';
import { UseAuth } from '../interfaces';
import { useNavigate } from 'react-router-dom';

const useAuth = (): UseAuth => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();
	const { token, status, error } = useSelector((state: RootState) => state.auth);

	const { mutate: login } = useLogin();
	const { mutate: logout } = useLogout();

	useEffect(() => {
		const savedToken = getCookie('accessToken');
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
							navigate('/dashboard');
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
