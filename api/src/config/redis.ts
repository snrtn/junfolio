import { createClient } from 'redis';

const redisUrl = process.env.REDIS_URL;

if (!redisUrl) {
	throw new Error('REDIS_URL is not defined in environment variables');
}

const redisClient = createClient({
	url: redisUrl,
});

redisClient.on('error', (err: Error) => console.error('Redis Client Error', err));

redisClient.connect().catch((err: Error) => {
	console.error('Redis connection error', err);
});

export default redisClient;
