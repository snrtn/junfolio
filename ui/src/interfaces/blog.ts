import { UseQueryResult } from '@tanstack/react-query';

export interface Post {
	id: number;
	title: string;
	content: string;
	tags: string[];
	image: string;
	author: string;
	createdAt: string;
	updatedAt: string;
}

export interface BlogState {
	posts: Post[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}

export interface UseBlog {
	fetchPosts: UseQueryResult<Post[], Error>;
	createPost: (post: Omit<Post, 'id'>) => void;
	updatePost: (post: Post) => void;
	deletePost: (postId: number) => void;
	posts: Post[];
	status: 'idle' | 'loading' | 'succeeded' | 'failed';
	error: string | null;
}
