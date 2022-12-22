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
			default: 'in progess',
			enum: ['in progress', 'aborted', 'delivered'],
		},
		createdBy: {
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
