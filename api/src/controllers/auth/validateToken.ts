import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../../models/user';

const { REFRESH_SECRET_KEY, SECRET_KEY } = process.env;

if (!REFRESH_SECRET_KEY) {
	throw new Error('REFRESH_SECRET_KEY is not defined in environment variables');
}

if (!SECRET_KEY) {
	throw new Error('SECRET_KEY is not defined in environment variables');
}

export const validateToken = async (req: Request, res: Response) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		return res.status(401).json({ message: 'Refresh token not provided' });
	}

	try {
		const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as { userId: string };
		const user = await User.findById(decoded.userId);

		if (!user) {
			return res.status(401).json({ message: 'Invalid token' });
		}

		const accessToken = jwt.sign({ userId: user._id.toString() }, SECRET_KEY, {
			expiresIn: process.env.TOKEN_EXPIRATION || '15m',
		});

		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 15 * 60 * 1000, // 15 minutes
		});

		res.json({ user, accessToken }); // 액세스 토큰을 반환하도록 수정
	} catch (error) {
		res.status(403).json({ message: 'Invalid refresh token' });
	}
};
