import apiClient from '../../apiClient';
import { AuthResponse } from '../types';

const logout = async (): Promise<AuthResponse> => {
	const response = await apiClient.post('/api/auth/logout');
	return response.data;
};

export default logout;
