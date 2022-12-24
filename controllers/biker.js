import { SERVER_ERROR } from '../constants/index.js';
import Parcel from '../models/Parcel.js';

const getAllParcels = async (req, res, next) => {
	try {
		const parcels = await Parcel.find({}).exec();

		return res.render('pages/biker/todo', {
			pageTitle: 'ToDo @ Parcelify.',
			parcels,
		});
	} catch (error) {
		return res.status(SERVER_ERROR).send({
			errorMessage: error.message,
		});
	}
};

const getSingleParcel = async (req, res, next) => {
	try {
		const id = req.params.id;

		const parcel = await Parcel.findById(id).exec();

		if (!parcel) {
			return res.redirect('/');
		}

		return res.render('pages/biker/parcel', {
			pageTitle: 'A single parcel',
			parcel,
		});
	} catch (error) {
		return res.status(SERVER_ERROR).send({
			errorMessage: error.message,
		});
	}
};

const editParcel = async (req, res, next) => {
	try {
		const id = req.params.id;
		const updatedStatus = req.body.status;
		const updatedTime = req.body.time;

		const parcel = await Parcel.findById(id).exec();

		if (
			!parcel?.updatedBy ||
			parcel?.updatedBy._id.toString() === req.session.user._id.toString()
		) {
			await Parcel.findByIdAndUpdate(
				id,
				{
					status: updatedStatus,
					deliveryTime: updatedTime,
					updatedBy: req.session.user._id,
				},
				{ new: true }
			);

			return res.redirect('/biker/todo');
		}

		// if the parcel isn't belong to me, I can't pick it up!
		if (
			parcel?.updatedBy._id.toString() !== req.session.user._id.toString()
		) {
			return res.redirect('/');
		}
	} catch (error) {
		return res.status(SERVER_ERROR).send({
			errorMessage: error.message,
		});
	}
};

export { getAllParcels, getSingleParcel, editParcel };
