/*jshint esversion: 6 */
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import onError from './libs';
const $ = gulpLoadPlugins();

gulp.task('stylus', () => {
  return gulp.src('src/stylus/**/*.styl')
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.stylus())
    .pipe(gulp.dest('src/css'));
    ;
});
