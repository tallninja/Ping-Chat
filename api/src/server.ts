import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import * as models from './models';
import apiRoutes from './routes';

models.init(); // connect to database

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
	process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev') // logging
);

/*
 * Fixes this error:
 * Property 'user' does not exist on type 'Session & Partial<SessionData>'.ts(2339)
 */
declare module 'express-session' {
	export interface SessionData {
		user: { _id: string };
	}
}

app.use(
	session({
		secret: process.env.SESSION_SECRET as string,
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1 * 24 * 60 * 60 * 1000,
		},
	})
);

app.get('/', (req: Request, res: Response) => {
	return res.status(SC.OK).json({ info: 'Ping Messaging API' });
});

app.use('/api', apiRoutes);

const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.info('Server listening on:', `${BASE_URL}:${PORT}`);
});
