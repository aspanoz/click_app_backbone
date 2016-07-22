/*jshint esversion: 6 */
function whatever (error) {

    const gulp = require('gulp');
    const gutil = require('gulp');

    const lineNumber = (error.lineNumber) ? 'LINE ' + error.lineNumber + ' -- ' : '';

    notify.onError({
        "title": "Task Failed [<%= error.plugin %>]",
        "subtitle": 'Failure!',
        "icon": path.join(__dirname, "fail.png"),
        "message": "Line: " + lineNumber + " Error: <%= error.message %>",
    })(error);

    let report = '';
    const chalk = gutil.colors.white.bgRed;

    report += chalk('TASK:') + ' [' + error.plugin + ']\n';
    report += chalk('PROB:') + ' ' + error.message + '\n';

    if (error.lineNumber) { report += chalk('LINE:') + ' ' + error.lineNumber + '\n'; }
    if (error.fileName)   { report += chalk('FILE:') + ' ' + error.fileName + '\n'; }

    console.error(report);

    this.emit('end');
}
