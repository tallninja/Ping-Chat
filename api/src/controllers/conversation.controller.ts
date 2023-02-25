import { Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { Conversation } from '../models';

export const createConversation = async (req: Request, res: Response) => {
	try {
		const conversation = new Conversation(req.body);
		const [p1, p2] = req.body.participants;
		const existingConversation = await Conversation.findOne({
			participants: {
				$all: req.body.participants,
			},
		});
		if (existingConversation && p1 === p2)
			return res
				.status(SC.BAD_REQUEST)
				.json({ error: 'Conversation already exists' });
		const newConversation = await conversation.save();
		return res.status(SC.OK).json(newConversation);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

export const getConversations = async (req: Request, res: Response) => {
	try {
		const conversations = await Conversation.find();
		return res.status(SC.OK).json(conversations);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

export const getUserConversations = async (req: Request, res: Response) => {
	try {
		const conversations = await Conversation.find({
			participants: { $in: [req.params.userId] },
		});
		return res.status(SC.OK).json(conversations);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

// export const getConversation = async (req: Request, res: Response) => {
// 	try {
// 		const conversation = await Conversation.findById(req.params.id);
// 		return res.status(SC.OK).json(conversation);
// 	} catch (error) {
// 		console.error(error);
// 		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
// 	}
// };
