var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var git = require('gulp-git');
var bump = require('gulp-bump');
var filter = require('gulp-filter');
var tag_version = require('gulp-tag-version');

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

gulp.task('dist', function () {
    return gulp.src('src/*.js')
        .pipe(gulp.dest('dist'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist'));
});

gulp.task('default', ['dist']);

function inc(importance) {
    gulp.src(['./package.json', './bower.json'])
        .pipe(bump({type: importance}))
        .pipe(gulp.dest('./'));

    gulp.src('./')
        .pipe(git.add())
        .pipe(git.commit('bumps package version'))
        .pipe(filter('package.json'))
        .pipe(tag_version());
}
gulp.task('patch', ['dist'], function() { return inc('patch'); });
gulp.task('feature', ['dist'], function() { return inc('minor'); });
gulp.task('release', ['dist'], function() { return inc('major'); });

