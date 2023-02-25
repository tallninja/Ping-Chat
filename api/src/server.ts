import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import cors, { CorsOptions } from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import session from 'express-session';
import * as models from './models';
import apiRoutes from './routes';

models.init(); // connect to database

const app: Application = express();

const whitelist = ['http://localhost:3000', 'http://localhost:5173'];

app.use(
	cors({
		origin: (
			origin: string,
			callback: (err: Error | null, origin?: boolean) => void
		) => {
			if (whitelist.indexOf(origin) !== -1 || !origin) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'));
			}
		},
		credentials: true,
		optionsSuccessStatus: 200,
	} as CorsOptions)
);
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
		user: {
			_id: string;
			firstName: string;
			lastName: string;
			email: string;
			avatar: string;
		};
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
