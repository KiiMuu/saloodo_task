import User from '../models/User.js';
import { comparePasswords, hashPassword } from '../utils/bcrypt.js';
import { SERVER_ERROR, UNPROCESSABLE_ENTITY } from '../constants/index.js';

const getLoginPage = (req, res, next) => {
	let message = req.flash('error');

	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}

	res.render('pages/auth/login', {
		pageTitle: 'Login',
		errorMessage: message,
		oldInputs: {
			email: '',
			password: '',
		},
	});
};

const login = async (req, res, next) => {
	try {
		const { email, password } = req.body;

		const user = await User.findOne({ email }).exec();

		if (!user) {
			return res.status(UNPROCESSABLE_ENTITY).render('pages/auth/login', {
				pageTitle: 'Login | Errors!',
				errorMessage: 'The user with this email does not exist.',
				oldInputs: {
					email,
					password,
				},
			});
		}

		const isMatch = await comparePasswords(password, user.password);

		if (isMatch) {
			req.session.isLoggedIn = true;
			req.session.user = user;
			return req.session.save(err => {
				if (err) console.log(err);

				res.redirect('/');
			});
		} else {
			return res.status(UNPROCESSABLE_ENTITY).render('pages/auth/login', {
				pageTitle: 'Login | Errors!',
				errorMessage: 'Invalid email or password.',
				oldInputs: {
					email,
					password,
				},
			});
		}
	} catch (error) {
		return res.status(SERVER_ERROR).send({
			errorMessage: error.message,
		});
	}
};

const getRegisterPage = (req, res, next) => {
	let message = req.flash('error');

	if (message.length > 0) {
		message = message[0];
	} else {
		message = null;
	}

	res.render('pages/auth/register', {
		pageTitle: 'Register',
		errorMessage: message,
		oldInputs: {
			firstName: '',
			lastName: '',
			email: '',
			password: '',
		},
	});
};

const register = async (req, res, next) => {
	try {
		const { firstName, lastName, email, password } = req.body;
		const user = await User.findOne({ email }).exec();

		if (user) {
			return res
				.status(UNPROCESSABLE_ENTITY)
				.render('pages/auth/register', {
					pageTitle: 'Register | Errors!',
					errorMessage: 'This email already exists. Try another one.',
					oldInputs: {
						firstName,
						lastName,
						email,
						password,
					},
				});
		}

		const hashedPassword = await hashPassword(password);

		let newUser = await new User({
			firstName,
			lastName,
			email,
			password: hashedPassword,
		}).save();

		req.session.isLoggedIn = true;
		req.session.user = newUser;
		return req.session.save(err => {
			if (err) console.log(err);

			res.redirect('/');
		});
	} catch (error) {
		return res.status(SERVER_ERROR).send({
			errorMessage: error.message,
		});
	}
};

const logout = (req, res, next) => {
	req.session.destroy(err => {
		if (err) console.log(err);

		res.redirect('/login');
	});
};

export { getLoginPage, login, getRegisterPage, register, logout };
