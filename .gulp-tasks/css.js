/*jshint esversion: 6 */
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import path from 'path';
import fs from 'fs';

import modules from 'postcss-modules';
import reporter from 'postcss-reporter';
import doiuse from 'doiuse';
import autoprefixer from 'autoprefixer';

import onError from './libs';
const $ = gulpLoadPlugins();

const wstream = fs.createWriteStream('cssBrowserCompatible.log');

const doiuseConfig = {
    browsers: [ 'ie >= 10', '> 1%', 'last 2 versions' ],
    ignoreFiles: ['**/normalize.css'],
    onFeatureUsage(usageInfo) {
        wstream.write(usageInfo.message + '\n');
    }
};

function getJSONFromCssModules(cssFileName, json) {
    const cssName = path.basename(cssFileName, '.css');
    const jsonFileName = path.resolve('./src/html', `${ cssName }.json`);
    fs.writeFileSync(jsonFileName, JSON.stringify(json));
}

gulp.task('css', () => {

    const processors = [
        autoprefixer({ browsers: ['last 2 version'] }),
        modules({ getJSON: getJSONFromCssModules }),
        //doiuse(doiuseConfig),
        reporter({ clearMessages: true }),
    ];

    let stream = gulp
        .src('src/css/styles.css')
        .pipe($.plumber({ errorHandler: onError }))
        .pipe($.postcss(processors))
        .pipe($.plumber.stop())
        .pipe(gulp.dest('app'));

    wstream.write('\n');

    return stream;
});
