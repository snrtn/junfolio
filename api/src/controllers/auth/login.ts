import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import { IUser } from '../../interfaces/iUser';
import { generateAccessToken, generateRefreshToken } from '../../utils/generateToken';

export const login = async (req: Request, res: Response) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(400).json({ message: 'Username and password are required.' });
	}

	try {
		const user: IUser | null = await User.findOne({ username });
		if (!user) return res.status(400).json({ message: 'User not found' });

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

		const accessToken = generateAccessToken(user._id.toString());
		const refreshToken = generateRefreshToken(user._id.toString());

		res.cookie('accessToken', accessToken, {
			httpOnly: false, // JavaScript에서 접근 가능
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax', // Adjust this as necessary
			maxAge: 3600000, // 1시간
		});

		res.cookie('refreshToken', refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 3600000, // 1 hour
		});

		res.json({ message: 'Login successful' });
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};
