var gulp = require( "gulp" );
var concat = require( "gulp-concat" );
var uglify = require( "gulp-uglify" );
var sourcemaps = require( "gulp-sourcemaps" );
var vendorScripts = [
];


var vendorScripts = [
	"./node_modules/jquery-mousewheel/jquery.mousewheel.js",
	"./node_modules/velocity-animate/velocity.min.js",
	"./node_modules/disable-scroll/dist/disable-scroll.min.js",
	"./node_modules/vide/dist/jquery.vide.min.js",
];


gulp.task( "vendors", function() {
	return gulp.src( vendorScripts )
    .pipe( sourcemaps.init() )
    .pipe( concat( "vendor.min.js" ) )
    .pipe( uglify() )
    .pipe( sourcemaps.write() )
    .pipe( gulp.dest( "assets/" ) );
});
 