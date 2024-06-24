import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest';
import redisClient from '../config/redis';

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const token = req.cookies.accessToken;
	console.log('Token from cookie:', token);
	if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

	try {
		const isBlacklisted = await redisClient.get(`blacklist:${token}`);
		if (isBlacklisted) {
			return res.status(401).json({ message: 'Invalid token.' });
		}

		const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { _id: string };
		req.user = { _id: decoded._id };
		next();
	} catch (error) {
		res.status(400).json({ message: 'Invalid token.' });
	}
};

export default authMiddleware;
