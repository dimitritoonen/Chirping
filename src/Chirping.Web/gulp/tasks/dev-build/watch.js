﻿var gulp = require('gulp');
var config = require('../../config').watch;

// start the browsersync task and watch files for changes
gulp.task('watch', ['browsersync'], function () {

  gulp.watch(config.sass, ['sass', 'scsslint']);
  gulp.watch(config.scripts, ['copy:scripts', 'jshint']);
  gulp.watch(config.images, ['images']);
  gulp.watch(config.html, ['html']);

});