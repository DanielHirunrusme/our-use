var gulp = require( "gulp" );
var jscs = require( "gulp-jscs" );

/** the jscs and jshint tasks need improvement */
gulp.task( "jscs-build", function() {
	return gulp.src([ "gulpfile.js", "tasks/*.js" ])
		.pipe( jscs({ fix: true }) )
		.pipe( jscs.reporter() )
		.pipe( gulp.dest(function( file ) {
			return file.base;
		}) );
});

gulp.task( "jscs-devel", function() {
	return gulp.src([ "src/js/**/*.js" ])
		.pipe( jscs({ fix: true }) )
		.pipe( jscs.reporter() )
		.pipe( gulp.dest(function( file ) {
			return file.base;
		}) );
});
