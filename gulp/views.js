var gulp = require( "gulp" );
var plumber = require( "gulp-plumber" );

var jade = require( "gulp-jade" );

var paths = require( "./config" ).paths;

gulp.task( "views", function() {
  return create( false );
} );

gulp.task( "views-build", function() {
  return create( true );
} );

function create( isBuild ) {
  return gulp.src( paths.views + "*.jade" )
             .pipe( plumber() )
             .pipe( jade( { pretty: !isBuild, basedir: paths.views } ) )
             .pipe( plumber.stop() )
             .pipe( gulp.dest( isBuild ? paths.build : paths.dist ) );
}
