var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('test', function () {
    if (typeof process.env.NODE_ENV === 'undefined') {
        process.env.NODE_ENV = 'test';
    }
    return gulp.src('test/*', {read: false})
        .pipe(mocha({ui: 'bdd', reporter: 'spec'}));
});

gulp.task('lint', function () {
    return gulp.src(['src/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
