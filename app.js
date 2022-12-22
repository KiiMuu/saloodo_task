import express from 'express';
import path from 'path';
import logger from 'morgan';
import session from 'express-session';
import dotenv from 'dotenv';
import flash from 'connect-flash';
import csurf from 'csurf';
import connectToMongoDB from './config/db.js';

// app routes and controllers
import indexRoutes from './routes/index.js';
import authRoutes from './routes/auth.js';
import senderRoutes from './routes/sender.js';
import { get404, get500 } from './controllers/error.js';

// app init
const app = express();
const csrfProtection = csurf();

// database connection
connectToMongoDB;

const __dirname = path.resolve();
dotenv.config();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'assets')));
app.set('trust proxy', 1);
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: 'auto', // works on http or https but not both!
		},
	})
);
app.use(flash());
app.use(csrfProtection);
app.use((req, res, next) => {
	res.locals.csrfToken = req.csrfToken();

	next();
});

// use app routes
app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/sender', senderRoutes);

// use some local variables -> via entire app.
app.use((req, res, next) => {
	res.locals.isAuth = req.session.isAuth;

	next();
});

// errors!
app.use(get404);
app.use(get500);

const port = process.env.PORT | 5000;
app.listen(port, () => {
	console.log(`App is up on port: ${port}`);
});
