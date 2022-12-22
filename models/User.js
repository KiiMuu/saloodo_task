import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const UserSchema = new Schema(
	{
		firstName: {
			type: String,
			required: true,
		},
		lastName: {
			type: String,
			required: true,
		},
		username: {
			type: String,
			required: true,
			unique: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		resetToken: String,
		resetTokenExpiration: Date,
		role: {
			enum: ['sender', 'biker'],
			default: 'sender',
		},
		parcels: {
			ref: 'Parcel',
			type: ObjectId,
		},
	},
	{
		timestamps: true,
	}
);

const User = mongoose.model('User', UserSchema);

export default User;
