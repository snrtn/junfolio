// types.ts
export interface User {
	username: string;
	password: string;
}

export interface AuthResponse {
	user: User;
	accessToken: string;
}
