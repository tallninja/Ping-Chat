import { Request, Response, Router } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import authRoutes from './auth.routes';
import conversationRoutes from './conversation.routes';

const router: Router = Router();

router.get('/', (req: Request, res: Response) => {
	return res.status(SC.OK).json({ info: 'API Routes' });
});

router.use('/auth', authRoutes);
router.use('/conversations', conversationRoutes);

export default router;
