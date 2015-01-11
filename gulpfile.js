'use strict';

var autoprefixer = require('gulp-autoprefixer'),
    browserify = require('gulp-browserify'),
    cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    del = require('del'),
    gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    livereload = require('gulp-livereload'),
    minifycss = require('gulp-minify-css'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    uglify = require('gulp-uglify');

gulp.task('js', function() {
    return  gulp.src('./src/js/**/*.js')
                .pipe(jshint())
                .pipe(jshint.reporter('default'))
                .pipe(browserify({
                  standalone: "foobar",
                  insertGlobals : true,
                  // debug : !gulp.env.production
                  debug : true  // TODO do something smarter
                }))
                .pipe(concat('oncoprint.js'))
                .pipe(gulp.dest('dist/assets/js'))
                .pipe(rename({suffice: 'min'}))
                .pipe(uglify())
                .pipe(gulp.dest('dist/assets/js'))
                .pipe(notify({ message: 'Done with JavaScript' }));
});


// Clean
gulp.task('clean', function(cb) {
    del(['dist'], cb)
});


// Default
gulp.task('default', ['clean'], function() {
    gulp.start('js');
});


// Watch
gulp.task('watch', function() {
  gulp.watch('src/js/**/*.js', ['js']);
});
