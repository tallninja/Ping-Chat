import mongoose from 'mongoose';
import User from './User';
import Conversation from './Conversation';
import Message from './Message';

const init = () => {
	mongoose.set('strictQuery', false);
	mongoose.connect(process.env.MONGO_URI as string, (error) => {
		if (error) console.error('Failed to connect to Database!!!');
		console.info('Connected to Database');
	});
};

export { init, User, Conversation, Message };
