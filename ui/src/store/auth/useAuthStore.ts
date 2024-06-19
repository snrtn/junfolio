import create from 'zustand';
import signup from './api/signup';
import login from './api/login';
import logout from './api/logout';

interface User {
	email: string;
	password: string;
}

interface AuthState {
	user: User | null;
	error: string | null;
	signup: (user: User) => Promise<void>;
	login: (user: User) => Promise<void>;
	logout: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
	user: null,
	error: null,
	signup: async (user: User) => {
		try {
			const response = await signup(user);
			set({ user: response, error: null });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	login: async (user: User) => {
		try {
			const response = await login(user);
			set({ user: response, error: null });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
	logout: async () => {
		try {
			await logout();
			set({ user: null, error: null });
		} catch (error: any) {
			set({ error: error.message });
		}
	},
}));
