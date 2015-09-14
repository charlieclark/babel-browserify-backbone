var gulp = require( 'gulp' );
var paths = require( "./paths" );
var plugins = require( "./plugins" );

var revision = require( 'git-rev' );
var fs = require( 'fs' );
var mkdirp = require( 'mkdirp' );
var argv = require('yargs').argv;

/* BUILD */
gulp.task( 'init', function() {

	var exists = fs.existsSync( paths.assetPath );
	var starter = argv.starter || "basic";

	if ( !exists ) {
		gulp.src( [ paths.build.templates + 'starters/' + starter + '/**/*' ] )
			.pipe( gulp.dest( paths.rootPath ) );
	}

} );

gulp.task( 'release', function() {

	return plugins.runSequence( [ 'vendor_scripts_min', 'user_scripts_min', 'minify-css' ] );
} );