import apiClient from '../../apiClient';
import { AuthState } from '../types';

export const setToken =
	(token: string) =>
	(state: AuthState): Partial<AuthState> => ({
		token,
	});

export const clearToken =
	() =>
	(state: AuthState): Partial<AuthState> => ({
		token: null,
		user: null,
		status: 'unauthenticated',
	});

export const initializeAuth = async (set: any) => {
	set({ status: 'loading' });
	try {
		const response = await apiClient.get('/auth/validate-token', {
			withCredentials: true,
		});
		set({ user: response.data.user, status: 'authenticated' });
	} catch (error) {
		set({ token: null, user: null, status: 'unauthenticated' });
	}
};

export const setUser =
	(user: any) =>
	(state: AuthState): Partial<AuthState> => ({
		user,
	});

export const setStatus =
	(status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated') =>
	(state: AuthState): Partial<AuthState> => ({
		status,
	});

export const setError =
	(error: string | null) =>
	(state: AuthState): Partial<AuthState> => ({
		error,
	});

export const logout =
	() =>
	(state: AuthState): Partial<AuthState> => ({
		token: null,
		user: null,
		status: 'unauthenticated',
	});
