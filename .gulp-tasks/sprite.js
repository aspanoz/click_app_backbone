/*jshint esversion: 6 */
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';

import onError from './libs';
const $ = gulpLoadPlugins();


gulp.task('sprite', () => {
    let spriteData = gulp.src('src/images/sprite/*.*')
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.spritesmith({
        imgName: 'sprite.png',
        cssName: 'sprite.styl',
        cssFormat: 'stylus',
        algorithm: 'left-right',
        cssTemplate: '.gulp-tasks/stylus.template.mustache',
        cssVarMap(sprite) {
            sprite.name = 's-' + sprite.name;
        }
    }));

    spriteData.img.pipe(gulp.dest('app/media/images/')); // путь, куда сохраняем картинку
    spriteData.css.pipe(gulp.dest('src/stylus/libs/')); // путь, куда сохраняем стили

    return spriteData;
});
