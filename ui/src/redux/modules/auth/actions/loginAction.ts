// src/redux/actions/auth/loginAction.ts
import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi } from '../index';
import { LoginData } from '../index';
import { setAuthToken } from '../index';

export const loginAction = createAsyncThunk('auth/login', async (data: LoginData, { rejectWithValue }) => {
	try {
		const response = await loginApi(data.username, data.password);
		setAuthToken(response.token);
		return response.token;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
