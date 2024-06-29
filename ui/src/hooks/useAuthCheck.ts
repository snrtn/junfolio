import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser, setToken } from '../redux/slices/authSlice';
import { fetchUserByIdApi } from '../redux/modules/auth';
import { getCookie } from '../redux/modules/auth'; // getCookie 함수가 쿠키에서 토큰을 읽어오는 함수라고 가정합니다.

const useAuthCheck = () => {
	const dispatch = useDispatch();

	useEffect(() => {
		const token = getCookie('accessToken');
		if (token) {
			dispatch(setToken(token));
			fetchUserByIdApi()
				.then((user) => {
					dispatch(setUser(user));
				})
				.catch((error) => {
					console.error('Failed to fetch user', error);
				});
		}
	}, [dispatch]);
};

export default useAuthCheck;
