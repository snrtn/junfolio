import { createAsyncThunk } from '@reduxjs/toolkit';
import { logoutApi } from '../index';
import { clearAuthToken } from '../index';

export const logoutAction = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
	try {
		const response = await logoutApi();
		clearAuthToken();
		return response;
	} catch (error: any) {
		return rejectWithValue(error.response.data);
	}
});
