export interface User {
	username: string;
	password: string;
}

export interface AuthResponse {
	user: User;
	token: string;
}

export interface AuthState {
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
