import gulp from 'gulp';
import sass from 'gulp-dart-sass';
import autoprefixer from 'gulp-autoprefixer';
import concat from 'gulp-concat';
import nodemon from 'gulp-nodemon';
import livereload from 'gulp-livereload';

const nodemonTask = cb => {
	livereload.listen();
	nodemon({
		script: 'app.js',
		ext: 'js ejs',
		env: { NODE_ENV: 'development' },
		done: cb,
	});

	cb();
};

const sassTask = cb => {
	gulp.src('public/sass/*.scss', {
		sourcemaps: true,
	})
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(autoprefixer('last 2 versions'))
		.pipe(gulp.dest('assets/css'))
		.pipe(livereload({ start: true }));

	cb();
};

const jsTask = cb => {
	gulp.src(['public/js/*.js', 'public/js/*.js'])
		.pipe(concat('scripts.js'))
		.pipe(gulp.dest('assets/js'))
		.pipe(livereload({ start: true }));

	cb();
};

const watchTask = cb => {
	livereload.listen();
	gulp.watch(['public/**/*.scss'], gulp.series([sassTask]));
	gulp.watch(['public/**/*.js'], gulp.series([jsTask]));

	cb();
};

export default gulp.series(nodemonTask, sassTask, jsTask, watchTask);
