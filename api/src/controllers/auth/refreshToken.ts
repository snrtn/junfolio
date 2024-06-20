import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { generateAccessToken } from '../../utils/generateToken';

const { REFRESH_SECRET_KEY } = process.env;

if (!REFRESH_SECRET_KEY) {
	throw new Error('REFRESH_SECRET_KEY is not defined in environment variables');
}

export const refreshToken = async (req: Request, res: Response) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) {
		return res.status(401).json({ message: 'Refresh token not provided' });
	}

	try {
		const decoded = jwt.verify(refreshToken, REFRESH_SECRET_KEY) as { userId: string };
		const accessToken = generateAccessToken(decoded.userId);
		res.cookie('accessToken', accessToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 3600000, // 1 hour
		});
		res.json({ accessToken });
	} catch (error) {
		res.status(403).json({ message: 'Invalid refresh token' });
	}
};
