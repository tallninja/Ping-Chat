import mongoose, { Schema } from 'mongoose';

const MessageSchema = new Schema(
	{
		conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
		sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		text: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model('Message', MessageSchema);
