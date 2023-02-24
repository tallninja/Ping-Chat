import { Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { Conversation, Message } from '../models';

export const createMessage = async (req: Request, res: Response) => {
	try {
		const message = new Message(req.body);
		const conversation = await Conversation.findById(req.body.conversation);
		if (!conversation)
			return res
				.status(SC.BAD_REQUEST)
				.json({ error: 'Conversation Not Found!' });
		if (!conversation.participants.includes(message.sender))
			return res
				.status(SC.BAD_REQUEST)
				.json({ error: 'Not Participant in conversation!' });
		const newMessage = await message.save();
		return res.status(SC.OK).json(newMessage);
	} catch (error) {
		console.error(error);
		return res.status(SC.OK).json({ error });
	}
};

export const getMessages = async (req: Request, res: Response) => {
	try {
		const messages = await Message.find();
		return res.status(SC.OK).json(messages);
	} catch (error) {
		console.error(error);
		return res.status(SC.OK).json({ error });
	}
};

export const getConversationMessages = async (req: Request, res: Response) => {
	try {
		const messages = await Message.find({
			conversation: req.params.conversationId,
		}).sort({ createdAt: -1 });
		return res.status(SC.OK).json(messages);
	} catch (error) {
		console.error(error);
		return res.status(SC.OK).json({ error });
	}
};
