import { Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { User } from '../models';

const scrypt = promisify(_scrypt);

export const signupUser = async (req: Request, res: Response) => {
	try {
		const user = new User(req.body);

		const salt = randomBytes(16).toString('hex');
		const hash = (await scrypt(user.password, salt, 32)) as Buffer;
		user.password = `${salt}.${hash.toString('hex')}`;

		const newUser = await user.save();
		return res.status(SC.OK).json(newUser);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};
