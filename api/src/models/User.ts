import mongoose, { Schema } from 'mongoose';

export interface IUser {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

const UserSchema = new Schema<IUser>(
	{
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
	},
	{ timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);
