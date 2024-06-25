import { useQuery } from '@tanstack/react-query';
import { fetchPostsApi, Post } from '../index';

export const useFetchPosts = () => {
	return useQuery<Post[], Error>({
		queryKey: ['posts'],
		queryFn: fetchPostsApi,
	});
};
