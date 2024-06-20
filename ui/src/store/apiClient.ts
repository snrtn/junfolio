import axios from 'axios';

const apiClient = axios.create({
	baseURL: 'http://localhost:3000/api',
	withCredentials: true,
});

apiClient.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			await axios.post('http://localhost:3000/api/auth/refresh-token', {}, { withCredentials: true });
			return apiClient(originalRequest);
		}
		return Promise.reject(error);
	},
);

export default apiClient;
