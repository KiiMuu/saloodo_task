const getHomepage = (req, res, next) => {
	res.render('pages/index', { pageTitle: 'Hi from Homepage.' });
};

export { getHomepage };
