import { AuthState } from '../../../interfaces';

export const initialState: AuthState = {
	token: null,
	status: 'idle',
	error: null,
};
export type { AuthState, LoginData } from '../../../interfaces';
