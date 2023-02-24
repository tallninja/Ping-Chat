import mongoose from 'mongoose';
import User from './User';

const init = () => {
	mongoose.set('strictQuery', false);
	mongoose.connect(process.env.MONGO_URI as string, (error) => {
		if (error) console.error('Failed to connect to Database!!!');
		console.info('Connected to Database');
	});
};

export { init, User };
