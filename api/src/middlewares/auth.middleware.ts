import { NextFunction, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';

export const checkSession = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (req.session.user) next();
	else return res.status(SC.UNAUTHORIZED).json({ error: 'Unauthorized' });
};
