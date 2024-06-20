import { Response } from 'express';
import redisClient from '../../config/redis';
import { AuthenticatedRequest } from '../../interfaces/authenticatedRequest';

export const logout = async (req: AuthenticatedRequest, res: Response) => {
	const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
	if (!token) {
		console.log('No token provided');
		return res.status(400).json({ message: 'No token provided' });
	}

	try {
		console.log('Logout request received with token:', token);
		await redisClient.set(token, 'blacklisted', { EX: 3600 });
		res.clearCookie('token', { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'strict' });
		res.status(200).json({ message: 'Logged out' });
	} catch (error) {
		console.error('Error during logout:', error);
		res.status(500).json({ message: 'Server error' });
	}
};
