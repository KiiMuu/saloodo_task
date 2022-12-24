import mongoose from 'mongoose';

const Schema = mongoose.Schema;
const { ObjectId } = Schema.Types;

const ParcelSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ['processing', 'aborted', 'delivered'],
			default: 'processing',
		},
		deliveryTime: {
			type: Date,
		},
		createdBy: {
			ref: 'User',
			type: ObjectId,
		},
		updatedBy: {
			ref: 'User',
			type: ObjectId,
		},
	},
	{
		timestamps: true,
	}
);

const Parcel = mongoose.model('Parcel', ParcelSchema);

export default Parcel;
