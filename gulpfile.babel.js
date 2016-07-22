/*jshint esversion: 6 */
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import requireDir from 'require-dir';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

requireDir('.gulp-tasks');

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('serve', () => {
    gulp.series('scripts');
    browserSync({
        notify: false,
        port: 9000,
        server: {
            baseDir: ['.tmp', 'app'],
        }
    });
});

gulp.watch(['src/html/*.json', 'src/html/**/*.pug']).on('change', gulp.series('html'));
gulp.watch(['src/css/**/*.css']).on('change', gulp.series('css'));
gulp.watch(['src/stylus/**/*.styl']).on('change', gulp.series('stylus'));
gulp.watch(['app/js/**/*.js']).on('change', gulp.series('scripts'));
gulp.watch(['app/**/*.html']).on('all', reload);

gulp.task('default', gulp.series('clean', 'serve'/*, watch*/));
