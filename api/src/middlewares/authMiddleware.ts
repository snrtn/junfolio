import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
	user?: { _id: string };
}

const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const token = req.cookies.token;
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
