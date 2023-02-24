import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
	{
		sender: { type: mongoose.Types.ObjectId, ref: 'User' },
		text: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
