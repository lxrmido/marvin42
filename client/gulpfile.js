var gulp    = require('gulp');
var webpack = require('gulp-webpack');
var less    = require('gulp-less');

gulp.task('webpack', function(){
	gulp.src('src/**/*.js')
			.pipe(webpack(require('./webpack.js')))
			.pipe(gulp.dest('./'));
});

gulp.task('less', function(){
	gulp.src('less/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('dist/css/'));
});

gulp.task('watch', function(){
	gulp.watch('less/**/*.less', ['less']);
	gulp.watch('src/**/*', ['webpack']);
});