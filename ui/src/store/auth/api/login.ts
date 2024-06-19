import apiClient from '../../apiClient';
import { User, AuthResponse } from '../types';

const login = async (user: User): Promise<AuthResponse> => {
	const response = await apiClient.post('/api/auth/login', user);
	return response.data;
};

export default login;
