import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(' ')[1];
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
