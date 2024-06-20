import { create } from 'zustand';
import apiClient from '../apiClient';

interface AuthState {
	token: string | null;
	user: any;
	error: string | null;
	status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated';
	setToken: (token: string) => void;
	clearToken: () => void;
	initializeAuth: () => void;
	setUser: (user: any) => void;
	setStatus: (status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated') => void;
	setError: (error: string | null) => void;
	logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
	token: localStorage.getItem('token'),
	user: null,
	error: null,
	status: 'idle',
	setToken: (token: string) => {
		localStorage.setItem('token', token);
		set({ token });
	},
	clearToken: () => {
		localStorage.removeItem('token');
		set({ token: null, user: null, status: 'unauthenticated' });
	},
	initializeAuth: async () => {
		set({ status: 'loading' });
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const response = await apiClient.get('/auth/validate-token', {
					headers: {
						Authorization: `Bearer ${token}`,
					},
					withCredentials: true,
				});
				set({ user: response.data.user, status: 'authenticated' });
			} catch (error) {
				localStorage.removeItem('token');
				set({ token: null, user: null, status: 'unauthenticated' });
			}
		} else {
			set({ status: 'unauthenticated' });
		}
	},
	setUser: (user: any) => set({ user }),
	setStatus: (status: 'idle' | 'loading' | 'authenticated' | 'unauthenticated') => set({ status }),
	setError: (error: string | null) => set({ error }),
	logout: () => {
		set({ token: null, user: null, status: 'unauthenticated' });
	},
}));
