import { Response } from 'express';
import { AuthenticatedRequest } from '../../interfaces/authenticatedRequest';

export const detail = (req: AuthenticatedRequest, res: Response) => {
	if (!req.user) {
		return res.status(401).json({ message: 'User not authenticated' });
	}
	res.json({ user: req.user });
};
