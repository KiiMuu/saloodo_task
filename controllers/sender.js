import Parcel from '../models/Parcel.js';
import { SERVER_ERROR } from '../constants/index.js';

const getSenderParcels = async (req, res, next) => {
	try {
		const user = req.session.user;

		const parcels = await Parcel.find({
			createdBy: user?._id,
		}).sort({ createdAt: -1 });

		res.render('pages/sender/dashboard', {
			pageTitle: 'Dashboard @ Parcelify.',
			parcels,
		});
	} catch (error) {
		return res.status(SERVER_ERROR).send({
			errorMessage: error.message,
		});
	}
};

const getCreateParcelPage = async (req, res, next) => {
	res.render('pages/sender/create-parcel', {
		pageTitle: 'Create a new Parcel.',
	});
};

const createNewParcel = async (req, res, next) => {
	try {
		const { title } = req.body;
		const user = req.session.user;

		await Parcel.create({
			title,
			createdBy: user._id,
		});

		return res.redirect('/sender/dashboard');
	} catch (error) {
		return res.status(SERVER_ERROR).send({
			errorMessage: error.message,
		});
	}
};

export { getSenderParcels, getCreateParcelPage, createNewParcel };
