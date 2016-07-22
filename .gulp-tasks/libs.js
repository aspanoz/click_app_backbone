/*jshint esversion: 6 */
import gulp from 'gulp';
import path from 'path';
import gulpLoadPlugins from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

export default function onError (error) {
    $.notify.onError({
        "title": "Task Failed [<%= error.plugin %>]",
        "subtitle": 'Failure!',
        "icon": path.join(__dirname + 'img/', "fail.png"),
        "message": "<%= error.message %>",
    })(error);
    this.emit('end');
};
