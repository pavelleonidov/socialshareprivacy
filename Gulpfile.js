

/*
	Gulp tasks to use for runtime compiling and for minifying assets
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifyjs = require('uglify-js');
var composer = require('gulp-uglify/composer');
var minify = composer(uglifyjs, console);
var concat = require('gulp-concat');


gulp.task('minify-js', function(done) {
    gulp.src(
        [
            'js/jquery.socialshareprivacy.js'
        ]
    )
    .pipe(concat('jquery.socialshareprivacy.min.js').on('error', function(e) {
        console.log(e);
    }))
    .pipe(minify().on('error', function(e) {
        console.log(e)
    }))
    .pipe(gulp.dest('./js/').on('error', function(e) {
        console.log(e);
    }));
    done();
});

function buildCSS(debug, outputStyle) {

    debug = debug || false;
    outputStyle = outputStyle || 'expanded';

    var stylesSrc = './scss/**/*.scss';
    var stylesDest = './css/';

    return gulp.src(stylesSrc)
        .pipe(sass({
            sourceComments: debug,
            outputStyle: outputStyle
        }).on('error', sass.logError))
        .pipe(gulp.dest(stylesDest));
}

// Compile SCSS to CSS and compress
gulp.task('styles-production', function(done) {
        buildCSS(false, 'compressed');
        done();
});

// Default CSS
gulp.task('styles-default', function(done) {
    buildCSS(false, 'expanded');
    done();
});

//Watch task
gulp.task('watch',function() {
    gulp.watch('scss/**/*.scss', { usePolling: true}, gulp.series('styles-default'));
});

// Default task
gulp.task('default',  gulp.series(['minify-js', 'styles-production', 'styles-default']));

// Debug task
gulp.task('debug', function(done) {
    buildCSS(true, 'expanded');
    done();
});
