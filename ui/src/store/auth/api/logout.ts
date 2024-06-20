import apiClient from '../../apiClient';

export const logout = async (token: string): Promise<void> => {
	await apiClient.post(
		'/auth/logout',
		{},
		{
			headers: {
				Authorization: `Bearer ${token}`,
			},
			withCredentials: true,
		},
	);
};
