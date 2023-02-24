import { Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { User } from '../models';

export const signupUser = async (req: Request, res: Response) => {
	try {
		const user = new User(req.body);
		const newUser = await user.save();
		return res.status(SC.OK).json(newUser);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};
