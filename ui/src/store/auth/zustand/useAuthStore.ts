import { create } from 'zustand';
import { AuthState } from '../types';
import { setToken, clearToken, initializeAuth, setUser, setStatus, setError, logout } from './actions';

export const useAuthStore = create<AuthState>((set) => ({
	token: null,
	user: null,
	error: null,
	status: 'idle',
	setToken: (token: string) => set((state) => setToken(token)(state)),
	clearToken: () => set((state) => clearToken()(state)),
	initializeAuth: () => initializeAuth(set),
	setUser: (user: any) => set((state) => setUser(user)(state)),
	setStatus: (status) => set((state) => setStatus(status)(state)),
	setError: (error: string | null) => set((state) => setError(error)(state)),
	logout: () => set((state) => logout()(state)),
}));
