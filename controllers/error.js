import { NOT_FOUND, SERVER_ERROR } from '../constants/index.js';

const get404 = (req, res, next) => {
	res.status(NOT_FOUND).render('pages/404', {
		pageTitle: 'Page not found',
		path: 'pages/404',
		isAuth: req.session.isLoggedIn,
	});
};

const get500 = (req, res, next) => {
	res.status(SERVER_ERROR).render('pages/500', {
		pageTitle: 'Error!',
		path: 'pages/500',
		isAuth: req.session.isLoggedIn,
	});
};

export { get404, get500 };
