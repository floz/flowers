var gulp = require( "gulp" );

var plumber = require( "gulp-plumber" );
var usemin = require('gulp-usemin');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rev = require('gulp-rev');
var runSequence = require( "run-sequence" );

var paths = require( "./config" ).paths;

gulp.task( "copy", function() {

} );

gulp.task( "minify", function( cb ) {
  runSequence( [ "minify-vendors" ], [ "minify-all" ], cb );
} );

gulp.task( "minify-vendors", function() {
  return gulp.src( paths.build + "*.html" )
             .pipe( plumber() )
             .pipe( usemin( {
                jsvendors: [ uglify() ]
               }))
             .pipe( plumber.stop() )
             .pipe( gulp.dest( paths.build ) );
} );

gulp.task( "minify-all", function() {
  return gulp.src( paths.build + "*.html" )
             .pipe( plumber() )
             .pipe( usemin( {
                css: [ minifyCss(), "concat", rev() ],
                js: [ uglify(), rev() ]
               }))
             .pipe( plumber.stop() )
             .pipe( gulp.dest( paths.build ) );
} );

gulp.task( "images", function() {

} );
