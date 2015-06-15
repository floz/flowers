var gulp = require( "gulp" );

var runSequence = require( "run-sequence" );

gulp.task( "default", function( cb ) {

  return runSequence( [ "dist" ], [ "browser-sync" ], [ "watch" ], cb )

} );

gulp.task( "dist", function( cb ) {

  return runSequence( [ "styles", "views", "scripts" ], cb );

} );

gulp.task( "build", function( cb ) {

  return runSequence( [ "styles-build", "views-build", "scripts-build" ], cb );

} );

gulp.task( "watch-views-reload", function( cb ) {

  return runSequence( [ "views" ], [ "reload" ], cb );

} );

gulp.task( "watch-styles-reload", function( cb ) {

  return runSequence( [ "styles" ], [ "reload-stream" ], cb );

} );

gulp.task( "watch-scripts-reload", function( cb ) {

  return runSequence( [ "scripts" ], [ "reload" ], cb );

} );
