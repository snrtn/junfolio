// src/redux/actions/axiosInstance.ts
import axios from 'axios';
import { getCookie } from './auth/authCookie';

// Axios 인스턴스 생성
const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000/api', // API의 기본 URL을 설정합니다.
	withCredentials: true, // 인증 정보를 요청과 함께 보낼지 설정합니다.
});

// 요청 인터셉터 설정
axiosInstance.interceptors.request.use(
	(config) => {
		const token = getCookie('token');
		console.log('Token from cookie:', token);
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

// 응답 인터셉터
axiosInstance.interceptors.response.use(
	(response) => {
		// 응답 데이터를 가공하거나 그대로 반환합니다.
		return response;
	},
	(error) => {
		// 응답 오류가 발생한 경우 수행할 작업을 여기에 작성합니다.
		return Promise.reject(error);
	},
);

export default axiosInstance;
