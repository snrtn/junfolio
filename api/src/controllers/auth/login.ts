import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../../models/user';
import { IUser } from '../../interfaces/iUser';
import generateToken from '../../utils/generateToken';

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

		const token = generateToken(user._id.toString());
		res.json({ token });
	} catch (error) {
		res.status(500).json({ message: 'Server Error' });
	}
};
