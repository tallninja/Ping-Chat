import mongoose, { ObjectId, Schema } from 'mongoose';

export interface IMessage {
	conversation: String;
	sender: String;
	text: string;
}

const MessageSchema = new Schema<IMessage>(
	{
		conversation: { type: mongoose.Schema.Types.ObjectId, ref: 'Message' },
		sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
		text: { type: String },
	},
	{ timestamps: true }
);

export default mongoose.model<IMessage>('Message', MessageSchema);
