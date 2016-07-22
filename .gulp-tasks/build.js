/*jshint esversion: 6 */
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import mainBowerFiles from 'main-bower-files';

const $ = gulpLoadPlugins();

// build app
gulp.task('build', () => {
    gulp.series('scripts');
    gulp.src(mainBowerFiles(), { base: 'app/js/libs/' })
    .pipe(gulp.dest('dist/js/libs'));
    return gulp.src(['app/**/*.{html,css,js}', '!app/js/libs/**'])
        .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
        .pipe($.if('*.js', $.uglify()))
        .pipe($.if('*.css', $.cssnano({safe: true, autoprefixer: false})))
        .pipe($.if('*.html', $.htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});
