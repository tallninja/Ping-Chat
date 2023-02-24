import mongoose, { Schema } from 'mongoose';

const ConversationSchema = new Schema(
	{
		participants: { type: Array },
	},
	{ timestamps: true }
);

export default mongoose.model('Conversation', ConversationSchema);
