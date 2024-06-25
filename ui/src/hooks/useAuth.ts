import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { useLogin, useLogout, getCookie } from '../redux/modules/auth';
import { clearToken, setToken, setUser, setStatus, setError } from '../redux/slices/authSlice';
import { UseAuth } from '../interfaces';
import { useNavigate } from 'react-router-dom';

const useAuth = (): UseAuth => {
	const dispatch = useDispatch<AppDispatch>();
	const navigate = useNavigate();

	const { token, user, status, error } = useSelector((state: RootState) => state.auth);

	const { mutate: login } = useLogin();
	const { mutate: logout } = useLogout();

	useEffect(() => {
		const savedToken = getCookie('accessToken');
		if (savedToken) {
			dispatch(setToken(savedToken));
			// 사용자 정보를 동적으로 가져오는 API 호출
			fetchUserDetails(savedToken);
		}
	}, [dispatch]);

	const fetchUserDetails = async (token: string) => {
		try {
			const response = await fetch('/api/user/details', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const data = await response.json();
			dispatch(setUser(data.user));
		} catch (error) {
			dispatch(setError('Failed to fetch user details'));
		}
	};

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
							// 사용자 정보를 설정
							fetchUserDetails(newToken);
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
		user,
		authStatus: status,
		authError: error,
	};
};

export default useAuth;
