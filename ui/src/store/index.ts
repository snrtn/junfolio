import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import * as authThunks from './thunk/authThunks';

export const store = configureStore({
	reducer: {
		auth: authReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { authThunks };
