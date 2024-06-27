import { Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
// import redisClient from '../config/redis';
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest';

const jwtBlacklist = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];
	if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

	try {
		// const isBlacklisted = await redisClient.get(token);
		// if (isBlacklisted) {
		// return res.status(401).json({ message: 'Token is invalid' });
		// }ㄴ

		const decoded = jwt.verify(token, process.env.SECRET_KEY!) as JwtPayload;

		if (decoded && typeof decoded === 'object' && 'userId' in decoded) {
			req.user = { _id: decoded.userId as string };
		} else {
			return res.status(401).json({ message: 'Invalid token structure.' });
		}

		next();
	} catch (err) {
		res.status(500).json({ message: 'Server error' });
	}
};

export default jwtBlacklist;
