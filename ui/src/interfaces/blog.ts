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
