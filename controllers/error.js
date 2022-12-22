const get404 = (req, res, next) => {
	res.status(404).render('pages/404', {
		pageTitle: 'Page not found',
		path: 'pages/404',
		// isAuthenticated: req.session.isLoggedIn,
	});
};

const get500 = (req, res, next) => {
	res.status(500).render('pages/500', {
		pageTitle: 'Error!',
		path: 'pages/500',
		// isAuthenticated: req.session.isLoggedIn,
	});
};

export { get404, get500 };
