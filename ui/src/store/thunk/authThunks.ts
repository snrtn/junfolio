import { createAsyncThunk } from '@reduxjs/toolkit';
import api from '../utils/api';

export const login = createAsyncThunk('auth/login', async (credentials: { username: string; password: string }) => {
	const response = await api.post('/login', credentials);
	return response.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
	await api.post('/logout');
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async () => {
	const response = await api.post('/refresh-token');
	return response.data;
});
