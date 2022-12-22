const getSenderParcels = (req, res, next) => {
	res.render('pages/sender/parcels', { pageTitle: 'Hi from Parcels.' });
};

export { getSenderParcels };
