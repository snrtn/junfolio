import { createSlice } from '@reduxjs/toolkit';
import { login, logout, refreshToken } from '../thunk/authThunks';

interface AuthState {
	user: any;
	accessToken: string | null | undefined;
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null | undefined;
}

const initialState: AuthState = {
	user: null,
	accessToken: null,
	status: 'idle',
	error: null,
};

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			})
			.addCase(logout.fulfilled, (state) => {
				state.status = 'idle';
				state.user = null;
				state.accessToken = null;
			})
			.addCase(refreshToken.fulfilled, (state, action) => {
				state.accessToken = action.payload.accessToken;
			});
	},
});

export default authSlice.reducer;
