import { Router } from 'express';
import {
	createMessage,
	getConversationMessages,
	getMessages,
} from '../controllers';

const router = Router();

router.get('/', getMessages);
router.get('/:conversationId', getConversationMessages);
router.post('/', createMessage);

export default router;
