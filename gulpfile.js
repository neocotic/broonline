'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('default', function() {
  // TODO
});

gulp.task('lint', function() {
  return gulp.src(['lib/**/*.js', 'public/js/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('YOUR_REPORTER_HERE'));
});

gulp.task('test', ['lint'], function() {
  // TODO
});