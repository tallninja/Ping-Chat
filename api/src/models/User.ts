import mongoose, { Schema } from 'mongoose';

const UserSchema = new Schema({
	firstName: { type: String },
	lastName: { type: String },
	email: { type: String },
	password: { type: String },
	createdAt: { type: Date },
	updatedAt: { type: Date },
});

export default mongoose.model('User', UserSchema);
