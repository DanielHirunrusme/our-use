// Include gulp
var gulp = require('gulp');

// Include Our Plugins

require('./tasks/sass');
require('./tasks/browserify');
require('./tasks/copy');
require( "./tasks/vendors" );

gulp.task('build', ['vendors', 'sass', 'browserify', 'copy']);

gulp.task('dev', ['vendors', 'sass', 'watchify', 'copy'], function() {
  // livereload.listen();

  // Watch source stylesheets
  gulp.watch([
    '**/*.scss'
  ], ['sass']);
  
  gulp.watch([ "./tasks/*.js", "./gulpfile.js" ], [ "jscs-build" ]);

  // Watchify handles the scripts

  // Watch templates and assets
  gulp.watch([
    'src/{images,fonts}/**'
  ], ['copy']);

 

});


// Default Task
gulp.task('default', ['dev']);