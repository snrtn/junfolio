import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
	token: string | null;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

const initialState: AuthState = {
	token: null,
	status: 'idle',
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setToken(state, action: PayloadAction<string>) {
			state.token = action.payload;
		},
		clearToken(state) {
			state.token = null;
		},
		setStatus(state, action: PayloadAction<AuthState['status']>) {
			state.status = action.payload;
		},
		setError(state, action: PayloadAction<string | null>) {
			state.error = action.payload;
		},
	},
});

export const { setToken, clearToken, setStatus, setError } = authSlice.actions;
export default authSlice.reducer;
