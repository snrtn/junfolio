import { Router } from 'express';
import { signup } from '../controllers/auth/signup';
import { login } from '../controllers/auth/login';
import { logout } from '../controllers/auth/logout';
import { refreshToken } from '../controllers/auth/refreshToken';
import { validateToken } from '../controllers/auth/validateToken';
import jwtBlacklist from '../middlewares/jwtBlacklist';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', jwtBlacklist, logout);
router.post('/refresh-token', refreshToken);
router.get('/validate-token', validateToken);

export default router;
