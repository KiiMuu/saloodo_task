import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import dotenv from 'dotenv';
import connectToMongoDB from './config/db.js';

// app routes
import indexRouter from './routes/index.js';

// app init
const app = express();

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
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', indexRouter);

const port = process.env.PORT | 5000;
app.listen(port, () => {
	console.log(`App is up on port: ${port}`);
});
