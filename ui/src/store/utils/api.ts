import axios from 'axios';
import { store } from '../index';
import { authThunks } from '../index';

const api = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
});

api.interceptors.request.use(
	(config) => {
		const state = store.getState();
		const token = state.auth.accessToken;
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error),
);

api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 403 && !originalRequest._retry) {
			originalRequest._retry = true;
			await store.dispatch(authThunks.refreshToken());
			const state = store.getState();
			const token = state.auth.accessToken;
			if (token) {
				originalRequest.headers.Authorization = `Bearer ${token}`;
				return axios(originalRequest);
			}
		}
		return Promise.reject(error);
	},
);

export default api;
