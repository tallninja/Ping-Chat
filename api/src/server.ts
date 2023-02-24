import * as dotenv from 'dotenv';
dotenv.config();

import express, { Application, Request, Response } from 'express';
import { StatusCodes as SC } from 'http-status-codes';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as models from './models';

models.init();

const app: Application = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
	process.env.NODE_ENV === 'production' ? morgan('common') : morgan('dev')
);

app.get('/', (req: Request, res: Response) => {
	return res.status(SC.OK).json({ info: 'Ping Messaging API' });
});

const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.info('Server listening on:', `${BASE_URL}:${PORT}`);
});
