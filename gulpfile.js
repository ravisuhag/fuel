'use strict';

const Gulp = require('gulp');
const RequireDir = require('require-dir');

// Load tasks

RequireDir('./tasks');


//  Build task definitions
Gulp.task('prod-build', ['fonts', 'images', 'misc', 'styles', 'webpack:build', 'lint']);
Gulp.task('dev-build', ['fonts', 'images', 'misc', 'styles', 'webpack:dev-build', 'lint']);
Gulp.task('dev-server', ['fonts', 'images', 'misc', 'styles', 'webpack:dev-server', 'lint']);

Gulp.task('dev', ['dev-server', 'watch']);
Gulp.task('build', ['prod-build']);

Gulp.task('default', ['dev']);