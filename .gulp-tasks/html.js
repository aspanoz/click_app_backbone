/*jshint esversion: 6 */
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import fs from 'fs';
import onError from './libs';

const $ = gulpLoadPlugins();

gulp.task('html', () => {

    return gulp
        .src('./src/html/**/*.pug')
        .pipe($.plumber({ errorHandler: onError }))
        .pipe($.data(function(file) {
            return JSON.parse(fs.readFileSync('./src/html/styles.json'));
         }))
        .pipe($.pug({
            pretty: true,
        }))
        .pipe($.plumber.stop())
        .pipe(gulp.dest('app'));
});
