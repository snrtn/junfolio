import { Response } from 'express';
import redisClient from '../../config/redis';
import { AuthenticatedRequest } from '../../interfaces/authenticatedRequest';

export const logout = async (req: AuthenticatedRequest, res: Response) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) return res.status(400).json({ message: 'No token provided' });

	try {
		await redisClient.set(token, 'blacklisted', { EX: 3600 });
		res.status(200).json({ message: 'Logged out' });
	} catch (error) {
		res.status(500).json({ message: 'Server error' });
	}
};
