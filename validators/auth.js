import isEmail from '../utils/isEmail.js';
import isLength from '../utils/isLength.js';
import { BAD_REQ, UNPROCESSABLE_ENTITY } from '../constants/index.js';

const renderPage = (
	res,
	msg,
	pageName,
	firstName,
	lastName,
	email,
	password
) => {
	return res.status(UNPROCESSABLE_ENTITY).render(`pages/auth/${pageName}`, {
		pageTitle: 'Register | Errors!',
		errorMessage: msg,
		oldInputs: {
			firstName,
			lastName,
			email,
			password,
		},
	});
};

export const validateRegister = (req, res, next) => {
	const { firstName, lastName, email, password } = req.body;

	if (!isEmail(email)) {
		renderPage(
			res,
			'Invalid email format. Please check it out.',
			'register',
			firstName,
			lastName,
			email,
			password
		);
	}

	if (!isLength(firstName, 3, 30)) {
		renderPage(
			res,
			'First name must be between 3 and 30 characters long.',
			'register',
			firstName,
			lastName,
			email,
			password
		);
	}

	if (!isLength(lastName, 3, 30)) {
		renderPage(
			res,
			'Last name must be between 3 and 30 characters long.',
			'register',
			firstName,
			lastName,
			email,
			password
		);
	}

	if (!isLength(password, 6, 40)) {
		renderPage(
			res,
			'Password must be between 6 and 40 characters long.',
			'register',
			firstName,
			lastName,
			email,
			password
		);
	}

	next();
};

export const validateLogin = (req, res, next) => {
	const { email, password } = req.body;

	if (!isEmail(email)) {
		renderPage(
			res,
			'Invalid email format. Please check it out.',
			'login',
			email,
			password
		);
	}

	if (!isLength(password, 6, 40)) {
		renderPage(
			res,
			'Password must be between 6 and 40 characters long.',
			'login',
			email,
			password
		);
	}

	next();
};
