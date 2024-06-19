import create from 'zustand';
import fetchPosts from './api/fetchPosts';
import fetchPostById from './api/fetchPostById';
import createPost from './api/createPost';
import updatePost from './api/updatePost';
import deletePost from './api/deletePost';
import { BlogPost } from './types';

interface BlogState {
	posts: BlogPost[];
	fetchAllPosts: () => Promise<void>;
	fetchPost: (id: string) => Promise<BlogPost | undefined>;
	addPost: (post: BlogPost) => Promise<void>;
	editPost: (id: string, post: BlogPost) => Promise<void>;
	removePost: (id: string) => Promise<void>;
}

export const useBlogStore = create<BlogState>((set) => ({
	posts: [],
	fetchAllPosts: async () => {
		const posts = await fetchPosts();
		set({ posts });
	},
	fetchPost: async (id: string) => {
		const post = await fetchPostById(id);
		return post;
	},
	addPost: async (post: BlogPost) => {
		await createPost(post);
		const posts = await fetchPosts();
		set({ posts });
	},
	editPost: async (id: string, post: BlogPost) => {
		await updatePost(id, post);
		const posts = await fetchPosts();
		set({ posts });
	},
	removePost: async (id: string) => {
		await deletePost(id);
		const posts = await fetchPosts();
		set({ posts });
	},
}));
