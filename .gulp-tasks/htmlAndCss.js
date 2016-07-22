/*jshint esversion: 6 */
const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const browserSync = require('browser-sync');
const path = require('path');
const fs = require('fs');

const modules = require('postcss-modules');
const reporter = require('postcss-reporter');
const doiuse = require('doiuse');
const autoprefixer = require('autoprefixer');
// const ejs          = require('gulp-ejs');
// import path         from 'path';
// import fs           from 'fs';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;


const onError = require('./reportError.js');

const wstream = fs.createWriteStream('cssBrowserCompatible.log');
const doiuseConfig = {
    browsers: [ 'ie >= 8', '> 1%' ],
    onFeatureUsage: function (usageInfo) {
        wstream.write(usageInfo.message + '\n');
    }
};


function getJSONFromCssModules(cssFileName, json) {
  const cssName = path.basename(cssFileName, '.css');
  const jsonFileName = path.resolve('./src/make', `${ cssName }.json`);
  fs.writeFileSync(jsonFileName, JSON.stringify(json));
}

gulp.task('css', () => {

  const processors = [
    autoprefixer({browsers: ['last 2 version']}),
    doiuse(doiuseConfig),
    reporter({ clearMessages: true }),
    modules({ getJSON: getJSONFromCssModules }),
  ];

  let stream = gulp
    .src('src/css/**/*.css')
    .pipe($.cached('css'))
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.postcss(processors))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('src/make'));

  wstream.write('\n');

  return stream
    .pipe($.notify({
      "title":'PostCSS',
      "message": 'PostCSS task done!',
      "onLast": true,
      "icon": path.join(__dirname, "ok.png"),
    }));
});

gulp.task('html', ['css'], () => {

  let stream = gulp
    .src('./src/pug/*.pug')
    .pipe($.plumber({ errorHandler: onError }))
    .pipe($.data(function(file) {
      return require('../src/make/' + path.basename(file.path, '.pug') + '.json');
    }))
    .pipe($.pug({
      pretty: true,
      cache: true,
    }))
    .pipe($.plumber.stop())
    .pipe(gulp.dest('./src/make'));

  return stream
   .pipe($.notify({
      "title":'PUG',
      "message": 'Successfully compiled',
      "onLast": true,
      "icon": path.join(__dirname, "ok.png"),
    }));

});

