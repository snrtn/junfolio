// src/redux/actions/auth/loginAction.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from './loginApi';
import { LoginData } from './authType';
import { setAuthToken } from './authCookie';

export const loginAction = createAsyncThunk('auth/login', async (data: LoginData, { rejectWithValue }) => {
	try {
		const response = await loginApi(data.username, data.password);
		setAuthToken(response.token);
		return response.token;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
