import apiClient from '../../apiClient';
import { User, AuthResponse } from '../types';

const signup = async (user: User): Promise<AuthResponse> => {
	const response = await apiClient.post('/api/auth/signup', user);
	return response.data;
};

export default signup;
