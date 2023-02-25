import { Router } from 'express';
import { login, logout, profile, signup } from '../controllers';
import { checkSession } from '../middlewares';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/profile', checkSession, profile);
router.get('/logout', checkSession, logout);

export default router;
