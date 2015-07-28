var gulp = require( "gulp" );

var paths = require( "./config" ).paths;

gulp.task( "watch", [ "watch-styles", "watch-views", "watch-js" ] );

gulp.task( "watch-styles", function() {

  gulp.watch( paths.styles + "**/*.styl", [ "styles" ] );

} );

gulp.task( "watch-views", function() {

  gulp.watch( paths.views + "**/*.jade", [ "views", "reload" ] );

} );

gulp.task( "watch-js", function() {

  gulp.watch( paths.dist + "js/**/*.js", [ "reload" ] );

} );
