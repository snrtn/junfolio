import { Response } from 'express';
import redisClient from '../../config/redis';
import { AuthenticatedRequest } from '../../interfaces/authenticatedRequest';

export const logout = async (req: AuthenticatedRequest, res: Response) => {
	const refreshToken = req.cookies.refreshToken;
	const accessToken = req.cookies.accessToken;

	if (!refreshToken || !accessToken) {
		return res.status(400).json({ message: 'No tokens provided' });
	}

	try {
		await redisClient.set(refreshToken, 'blacklisted', { EX: 3600 });
		await redisClient.set(accessToken, 'blacklisted', { EX: 3600 });

		res.clearCookie('refreshToken', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
		});

		res.clearCookie('accessToken', {
			httpOnly: false,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
		});

		res.status(200).json({ message: 'Logged out' });
	} catch (error) {
		console.error('Server error during logout:', error);
		res.status(500).json({ message: 'Server error' });
	}
};
