import { Request, Response, Router } from 'express';
import {
	createConversation,
	getConversations,
	getUserConversations,
} from '../controllers';

const router = Router();

router.get('/', getConversations);
router.post('/', createConversation);
router.get('/:userId', getUserConversations);

export default router;
