import { Request, Response, Router } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import usersRoutes from './user.routes';
import authRoutes from './auth.routes';
import conversationRoutes from './conversation.routes';
import messageRoutes from './message.routes';
import { checkSession } from '../middlewares';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	return res.status(SC.OK).json({ info: 'API Routes' });
});

router.use('/auth', authRoutes);
router.use('/users', checkSession, usersRoutes);
router.use('/conversations', checkSession, conversationRoutes);
router.use('/messages', checkSession, messageRoutes);

export default router;
