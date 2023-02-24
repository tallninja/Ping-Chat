import { Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { User } from '../models';

export const createUser = async (req: Request, res: Response) => {
	try {
		const user = new User(req.body);
		const newUser = await user.save();
		return res.status(SC.OK).json(newUser);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

export const getUsers = async (req: Request, res: Response) => {
	try {
		const users = await User.find();
		return res.status(SC.OK).json(users);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

export const getUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user)
			return res.status(SC.NOT_FOUND).json({ error: 'User Not Found' });
		return res.status(SC.OK).json(user);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

export const editUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user)
			return res.status(SC.NOT_FOUND).json({ error: 'User Not Found' });
		const updatedUser = await User.findByIdAndUpdate(user._id, req.body);
		return res.status(SC.OK).json(updatedUser);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

export const deleteUser = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user)
			return res.status(SC.NOT_FOUND).json({ error: 'User Not Found' });
		const updatedUser = await User.findByIdAndDelete(user._id);
		return res.status(SC.OK).json(updatedUser);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};
