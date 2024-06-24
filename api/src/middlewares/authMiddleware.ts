// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest } from '../interfaces/authenticatedRequest';

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const token = req.cookies.accessToken;
	console.log('Token from cookie:', token); // 로그 추가
	if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY!) as { _id: string };
		req.user = { _id: decoded._id };
		next();
	} catch (error) {
		res.status(400).json({ message: 'Invalid token.' });
	}
};

export default authMiddleware;
