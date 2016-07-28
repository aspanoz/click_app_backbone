/*jshint esversion: 6 */
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('scripts', () => {
  return gulp.src('app/js/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    //.pipe($.babel())
    .pipe($.sourcemaps.write('.'))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('.tmp/js'))
    .pipe(reload({stream: true}))
    ;
});
