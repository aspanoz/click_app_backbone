/*jshint esversion: 6 */
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const del = require('del');
const requireDir = require('require-dir');

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

requireDir('.gulp-tasks');


gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', ['scripts'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['.tmp', 'app'],
    }
  });

  gulp.watch([
    'app/*.html',
    'app/templates/**/*.html'
  ]).on('change', reload);

  gulp.watch('app/js/**/*.js', ['scripts']);
});

gulp.task('default', ['clean'], () => {
  gulp.start('serve');
});
