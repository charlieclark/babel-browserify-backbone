var gulp = require('gulp');
var paths = require("./paths");
var plugins = require("./plugins");

var fs = require('fs');
var mkdirp = require('mkdirp');
var argv = require('yargs').argv;
var _ = require('underscore');
var ncp = require('ncp').ncp;
var rimraf = require('rimraf');

/* BUILD */
gulp.task('init', function() {

	var exists = fs.existsSync(paths.assetPath);
	var starter = argv.starter || "basic";

	if (!exists) {
		gulp.src([paths.build.templates + 'starters/' + starter + '/**/*'])
			.pipe(gulp.dest(paths.rootPath));
	}

});

gulp.task('dev', ['watch', 'serve'], function(){});

gulp.task('release', ['vendor_scripts_min', 'user_scripts_min', 'minify-css'], function() {
	gulp.start( 'serve-release' );
});

gulp.task('dist', ['release'], function() {

	var releasePaths = _.extend({}, paths);

	traverseMapString(releasePaths, function(key, value) {
		return value.replace(paths.rootPath, paths.releasePath);
	});

	var ignore = [
		".sass-cache"
	];

	rimraf(paths.releasePath, function() {
		fs.mkdir(paths.releasePath, function() {
			ncp(paths.rootPath, paths.releasePath, {
				filter: function(path) {
					var use = true;
					for (var i = 0, l = ignore.length; i < l; i++) {
						if (path.indexOf(ignore[i]) >= 0) {
							use = false;
							break;
						}
					}
					return use;
				}
			}, function() {
				fs.renameSync(releasePaths.js.min + "bundle.min.js", releasePaths.js.compiled + "bundle.js");
				fs.renameSync(releasePaths.js.min + "vendor.min.js", releasePaths.js.compiled + "vendor.js");
				fs.renameSync(releasePaths.styles.min + "app.min.css", releasePaths.styles.css + "app.css");
				fs.unlink(releasePaths.js.vendor_config);
				rimraf(releasePaths.js.lib, function() {});
				rimraf(releasePaths.js.min, function() {});
				rimraf(releasePaths.js.user, function() {});

				rimraf(releasePaths.styles.sass, function() {});
				rimraf(releasePaths.styles.min, function() {});
				rimraf(releasePaths.styles.shared, function() {});
			});
		});
	});
});

function traverseMapString(o, func) {
	for (var i in o) {
		if (o[i] !== null && typeof(o[i]) == "object") {
			//going on step down in the object tree!!
			traverseMapString(o[i], func);
		} else {
			var newValue = func.apply(this, [i, o[i]]);
			o[i] = newValue;
		}
	}
}