const getHomePage = (req, res, next) => {
	res.render('pages/index', { title: 'Express' });
};

export { getHomePage };
