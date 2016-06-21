var gulp = require( "gulp" );
var jshint = require( "gulp-jshint" );
var stylish = require( "jshint-stylish" );

gulp.task( "jshint-build", function() {
  return gulp.src([ "gulpfile.js", "tasks/*.js" ])
    .pipe( jshint() )
    .pipe( jshint.reporter() );
});

gulp.task( "jshint-devel", function() {
  return gulp.src([ "src/js/**/*.js" ])
    .pipe( jshint() )
    .pipe( jshint.reporter( "fail") );
});
