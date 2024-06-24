// src/interfaces/auth.ts
export interface AuthState {
	token: string | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export interface LoginData {
	username: string;
	password: string;
}

export interface UseAuth {
	login: (username: string, password: string) => void;
	logout: () => void;
	token: string | null;
	authStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
	authError: string | null;
}
