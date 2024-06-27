import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest';
// import redisClient from '../config/redis';
import User from '../models/user';

const authMiddleware = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const token = req.cookies.accessToken || req.headers.authorization?.split(' ')[1];
	console.log('Token from cookie or header:', token);
	if (!token) {
		console.log('Access denied. No token provided.');
		return res.status(401).json({ message: 'Access denied. No token provided.' });
	}

	try {
		// const isBlacklisted = await redisClient.get(`blacklist:${token}`);
		// if (isBlacklisted) {
		// console.log('Token is blacklisted.');
		// return res.status(401).json({ message: 'Invalid token.' });
		// }ㄴ

		const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { userId: string };
		console.log('Decoded JWT:', decoded);

		const user = await User.findById(decoded.userId).select('-password');
		console.log('User from DB:', user);
		if (!user) {
			console.log('User not found in database.');
			return res.status(404).json({ message: 'User not found.' });
		}

		req.user = {
			...user.toObject(),
			_id: user._id.toString(),
		};
		console.log('Authenticated user:', req.user);
		next();
	} catch (error) {
		console.log('Error verifying token:', error);
		res.status(400).json({ message: 'Invalid token.' });
	}
};

export default authMiddleware;
