import { Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';
import { User } from '../models';

const scrypt = promisify(_scrypt);

// export interface Session {
// 	user: { _id: string }
// }

export const signup = async (req: Request, res: Response) => {
	try {
		const user = new User(req.body);

		const salt = randomBytes(16).toString('hex');
		const hash = (await scrypt(user.password, salt, 32)) as Buffer;

		user.password = `${salt}.${hash.toString('hex')}`;
		user.avatar = `https://robohash.org/${salt}`;

		const newUser = await user.save();
		return res.status(SC.OK).json(newUser);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		const user = await User.findOne({ email });
		if (!user)
			return res
				.status(SC.UNAUTHORIZED)
				.json({ error: 'Invalid email or password' });
		const [salt, passwordHash] = user.password.split('.');
		const hash = (await scrypt(password, salt, 32)) as Buffer;
		if (hash.toString('hex') !== passwordHash)
			return res
				.status(SC.UNAUTHORIZED)
				.json({ error: 'Invalid email or password' });
		req.session.user = {
			_id: user._id.toString(),
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			avatar: user.avatar,
		};
		return res.status(SC.OK).json(user);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

export const profile = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.session.user?._id);
		return res.status(SC.OK).json(user);
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};

export const logout = async (req: Request, res: Response) => {
	try {
		req.session.destroy((err) => {
			if (err) return res.status(SC.INTERNAL_SERVER_ERROR).json({ error: err });
		});
		return res.status(SC.OK).json({ info: 'Logged out successfully' });
	} catch (error) {
		console.error(error);
		return res.status(SC.INTERNAL_SERVER_ERROR).json({ error });
	}
};
