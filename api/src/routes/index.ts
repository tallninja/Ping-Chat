import { Request, Response, Router } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import usersRoutes from './user.routes';
import authRoutes from './auth.routes';
import conversationRoutes from './conversation.routes';
import messageRoutes from './message.routes';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	return res.status(SC.OK).json({ info: 'API Routes' });
});

router.use('/users', usersRoutes);
router.use('/auth', authRoutes);
router.use('/conversations', conversationRoutes);
router.use('/messages', messageRoutes);

export default router;
