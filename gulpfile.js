'use strict';

var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');

gulp.task('build', function() {
    return gulp.src('./assets/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('watch', function() {
    gulp.watch('./assets/sass/**/*.scss', ['build']);
});
