var gulp = require( "gulp" );
var gutil = require( "gulp-util" );
var plumber = require( "gulp-plumber" );
var browserSync = require( "browser-sync" );

var browserify = require( "browserify" );
var watchify = require( "watchify" );
var source = require( "vinyl-source-stream" );

//

var paths = require( "./config" ).paths;

var w = null;
var _isBuild = false;

gulp.task( "scripts", function() {
  return create( false );
} );

gulp.task( "scripts-build", function() {
  return create( true );
} );

function create( isBuild ) {
  _isBuild = isBuild;

  watchify.args.paths = [ paths.scripts ];
  watchify.args.extensions = [ ".coffee" ];
  watchify.args.debug = !_isBuild;
  watchify.args.fullPaths = !_isBuild;

  var b = browserify( paths.scripts + "main.coffee", watchify.args );
  b.transform( "coffeeify" );

  w = watchify( b );
  w.on( "update", bundle );

  return bundle();
}

function bundle() {
  return w.bundle()
            .on( "error", gutil.log )
          .pipe( source( "main.js" ) )
          .pipe( gulp.dest( ( _isBuild ? paths.build : paths.dist ) + "/js" ) );
}
