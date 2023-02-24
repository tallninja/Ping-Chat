import { Router } from 'express';
import { login, logout, signup } from '../controllers';
import { checkSession } from '../middlewares';

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/logout', checkSession, logout);

export default router;
