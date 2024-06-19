import {
	useQuery,
	useMutation,
	useQueryClient,
	UseMutationOptions,
	UseQueryOptions,
	QueryKey,
} from '@tanstack/react-query';
import fetchPosts from './api/fetchPosts';
import fetchPostById from './api/fetchPostById';
import createPost from './api/createPost';
import updatePost from './api/updatePost';
import deletePost from './api/deletePost';
import { BlogPost } from './types';

export const useFetchPosts = (options?: UseQueryOptions<BlogPost[], Error, BlogPost[], QueryKey>) => {
	return useQuery<BlogPost[], Error, BlogPost[], QueryKey>({
		queryKey: ['posts'],
		queryFn: fetchPosts,
		...options,
	});
};

export const useFetchPostById = (id: string, options?: UseQueryOptions<BlogPost, Error, BlogPost, QueryKey>) => {
	return useQuery<BlogPost, Error, BlogPost, QueryKey>({
		queryKey: ['post', id],
		queryFn: () => fetchPostById(id),
		...options,
	});
};

export const useCreatePost = (options?: UseMutationOptions<BlogPost, Error, BlogPost, unknown>) => {
	const queryClient = useQueryClient();
	return useMutation<BlogPost, Error, BlogPost>({
		mutationFn: createPost,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
		...options,
	});
};

export const useUpdatePost = (id: string, options?: UseMutationOptions<BlogPost, Error, BlogPost, unknown>) => {
	const queryClient = useQueryClient();
	return useMutation<BlogPost, Error, BlogPost>({
		mutationFn: (post: BlogPost) => updatePost(id, post),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['post', id] });
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
		...options,
	});
};

export const useDeletePost = (id: string, options?: UseMutationOptions<void, Error, string, unknown>) => {
	const queryClient = useQueryClient();
	return useMutation<void, Error, string>({
		mutationFn: () => deletePost(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['posts'] });
		},
		...options,
	});
};
