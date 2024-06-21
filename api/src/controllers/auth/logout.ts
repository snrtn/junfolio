import { Response } from 'express';
import redisClient from '../../config/redis';
import { AuthenticatedRequest } from '../../interfaces/authenticatedRequest';

export const logout = async (req: AuthenticatedRequest, res: Response) => {
	const refreshToken = req.cookies.refreshToken;
	const accessToken = req.headers.authorization?.split(' ')[1];

	if (!refreshToken || !accessToken) {
		return res.status(400).json({ message: 'No tokens provided' });
	}

	try {
		// Add tokens to Redis blacklist
		await redisClient.set(refreshToken, 'blacklisted', { EX: 3600 });
		await redisClient.set(accessToken, 'blacklisted', { EX: 3600 });

		// Clear refreshToken cookie
		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});

		// Clear accessToken cookie if stored as a cookie
		res.clearCookie('accessToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});

		res.status(200).json({ message: 'Logged out' });
	} catch (error) {
		console.error('Server error during logout:', error);
		res.status(500).json({ message: 'Server error' });
	}
};
