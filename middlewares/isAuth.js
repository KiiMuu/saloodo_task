const isAuth = (req, res, next) => {
	if (!req.session.isLoggedIn) {
		return res.redirect('pages/login');
	}

	next();
};

export { isAuth };
