﻿var gulp = require('gulp');
var runSequence = require('run-sequence');

/*
  Run all tasks needed for a build in defined order
*/
gulp.task('build:production', function (callback) {
  runSequence('delete', 'less:vendor',
    [
      'scripts:publish',
      'optimize:html',
      'less',
      'images',
      'fonts'
    ],
    'base64',
    [
      'optimize:js:production',
      'optimize:css',
      'copy:html:publish',
      'optimize:images',
      'copy:fonts:publish'
    ],
    //'revision',
    //'rev:collect',
    callback);
});