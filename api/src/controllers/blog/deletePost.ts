import { AuthenticatedRequest } from '../../interfaces/authenticatedRequest';
import { Request, Response } from 'express';
import BlogPost from '../../models/blogPost';
import { deleteFromDropbox } from '../../utils/dropbox';

export const deletePost = async (req: AuthenticatedRequest, res: Response) => {
	const { id } = req.params;

	try {
		const blogPost = await BlogPost.findByIdAndDelete(id);

		if (!blogPost) {
			return res.status(404).json({ message: 'Blog post not found.' });
		}

		const oldImagePath = blogPost.image.split('/').pop();
		await deleteFromDropbox(`/${oldImagePath}`);
		res.status(200).json({ message: 'Blog post deleted successfully.' });
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};
