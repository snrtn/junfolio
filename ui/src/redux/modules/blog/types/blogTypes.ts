import { BlogState } from '../../../../interfaces';

export const initialState: BlogState = {
	posts: [],
	status: 'idle',
	error: null,
};

export type { Post } from '../../../../interfaces';
