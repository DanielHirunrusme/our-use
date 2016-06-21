var gulp = require('gulp');
var newer = require('gulp-newer');
var config = require('../config.json');

/** Defines the "copy" task for Gulp. */
gulp.task('copy', function() {
  var destPath = 'dist/'+config.theme+'/';

  return gulp.src(['src/{fonts,images,html}/**', 'src/js/modernizr.min.js'], { base: 'src/' })
    .pipe(newer(destPath))
    .pipe(gulp.dest(destPath));
});