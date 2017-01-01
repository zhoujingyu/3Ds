var gulp = require('gulp'),
    sass = require('gulp-sass'),
    cssmin = require('gulp-clean-css'),
    prefixer = require('gulp-autoprefixer'),
    gulpBabel = require('gulp-babel');
var webpack = require('webpack'),
    webpackConfig = require('./webpack.config');
    //extractTextPlugin = require('extract-text-webpack-plugin');

gulp.task('watchSass', function () {
    gulp.watch('./public/src/sass/**', function (event) {
        console.log('<------------------' + new Date().toLocaleString() + '------------------>');
        gulp.src('./public/src/sass/**')
            .pipe(sass().on('error', sass.logError))
            //.pipe(prefixer({
            //    cascade:true,
            //    remove:true
            //}))
            .pipe(cssmin({
                keepBreaks: true,
                keepSpecialComments: '*'
            }))
            .pipe(gulp.dest('./public/dist/css/'));
    })
});

gulp.task('JSX', function () {
    console.log('<------------------JSX:' + new Date().toLocaleString() + '------------------>');
    gulp.src('./public/src/js/**')
        .pipe(gulpBabel({
            presets: ['react', 'es2015']
        }))
        .pipe(gulp.dest('./public/dist/js'))
});

gulp.task('watchBabel', function () {
    gulp.watch('./public/src/js/**', ['JSX'])
});

gulp.task('runWebpack', function () {
    webpack(webpackConfig, function (err, stats) {
        console.log(stats.toString());
        console.log('<------------------webpack:' + new Date().toLocaleString() + '------------------>');
    });
});