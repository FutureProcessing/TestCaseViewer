var gulp = require('gulp');
var webpack = require('gulp-webpack');
var concat = require('gulp-concat');
var less = require('gulp-less');
var webpackConf = require('./webpack.config.js');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');

gulp.task("webpack", function() {
    return gulp.src('src/js/main.js')
        .pipe(webpack( webpackConf ))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(livereload());
});

gulp.task('build-less', function(){
    return gulp.src('./src/less/**/*.less')
        .pipe(less().on('error', gutil.log))
        .pipe(gulp.dest('./dist/css'))
        .pipe(livereload());
});

gulp.task('copy', function() {
    gulp.src('src/index.sshtml')
      .pipe(gulp.dest('dist'));

    gulp.src('node_modules/perfect-scrollbar/dist/css/perfect-scrollbar.css')
      .pipe(gulp.dest('dist/css'));

    gulp.src('src/font/*.*')
      .pipe(gulp.dest('./dist/font'));
});

gulp.task('default', ['build-less', 'webpack', 'copy']);

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('src/**/*.less', ['build-less']);
    gulp.watch(['src/**/*.js', 'src/**/*.jsx'], ['webpack']);
});
