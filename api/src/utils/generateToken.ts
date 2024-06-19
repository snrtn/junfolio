import jwt from 'jsonwebtoken';

if (!process.env.SECRET_KEY) {
	throw new Error('SECRET_KEY is not defined in environment variables');
}

const generateToken = (userId: string): string => {
	const payload = { userId };
	const options = {
		expiresIn: process.env.TOKEN_EXPIRATION || '1h',
	};

	try {
		return jwt.sign(payload, process.env.SECRET_KEY, options);
	} catch (error) {
		throw new Error('Error generating token');
	}
};

export default generateToken;
