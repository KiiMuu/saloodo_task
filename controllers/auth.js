const getLoginPage = (req, res, next) => {
	let message = req.flash('error');

	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}

	res.render('pages/auth/login', {
		pageTitle: 'Login',
		path: 'pages/auth/login',
		errorMessage: message,
		oldInputs: {
			email: '',
			password: '',
		},
		validationErrors: [],
	});
};

export { getLoginPage };
