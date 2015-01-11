var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    del = require('del');

gulp.task('js', function() {
    return  gulp.src('./src/js/**/*.js')
                .pipe(jshint())
                .pipe(jshint.reporter('default'))
                .pipe(concat('main.js'))
                .pipe(gulp.dest('dist/assets/js'))
                .pipe(rename({suffice: 'min'}))
                .pipe(uglify())
                .pipe(gulp.dest('dist/assets/js'))
                .pipe(notify({ message: 'Done us JavaScript' }));
});

gulp.task('clean', function(cb) {
    del(['dist'], cb)
});

gulp.task('default', ['clean'], function() {
    gulp.start('js');
});
