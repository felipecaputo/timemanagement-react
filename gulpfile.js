'use strict';

var gulp = require('gulp');  // Base gulp package
var babelify = require('babelify'); // Used to convert ES6 & JSX to ES5
var browserify = require('browserify'); // Providers "require" support, CommonJS
var notify = require('gulp-notify'); // Provides notification to both the console and Growel
var rename = require('gulp-rename'); // Rename sources
var sourcemaps = require('gulp-sourcemaps'); // Provide external sourcemap files
var livereload = require('gulp-livereload'); // Livereload support for the browser
var gutil = require('gulp-util'); // Provides gulp utilities, including logging and beep
var chalk = require('chalk'); // Allows for coloring for logging
var source = require('vinyl-source-stream'); // Vinyl stream support
var buffer = require('vinyl-buffer'); // Vinyl stream support
var watchify = require('watchify'); // Watchify for source changes
var merge = require('utils-merge'); // Object merge tool
var duration = require('gulp-duration'); // Time aspects of your gulp process

//to run tests
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var isparta = require('isparta');
var runSequence = require('run-sequence');

// Configuration for Gulp
var config = {
  js: {
    src: 'src/app.js',
    watch: 'src/**/*',
    outputDir: './assets/lib/',
    outputFile: 'bundle.js',
  },
};

// Error reporting function
function mapError(err) {
  if (err.fileName) {
    // Regular error
    gutil.log(chalk.red(err.name)
      + ': ' + chalk.yellow(err.fileName.replace(__dirname + '/src/js/', ''))
      + ': ' + 'Line ' + chalk.magenta(err.lineNumber)
      + ' & ' + 'Column ' + chalk.magenta(err.columnNumber || err.column)
      + ': ' + chalk.blue(err.description));
  } else {
    // Browserify error..
    gutil.log(chalk.red(err.name)
      + ': '
      + chalk.yellow(err.message));
  }
}

// Completes the final file outputs
function bundle(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle()
    .on('error', mapError) // Map error reporting
    .pipe(source(config.js.src)) // Set source name
    .pipe(buffer()) // Convert to gulp pipeline
    .pipe(rename(config.js.outputFile)) // Rename the output file
    .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
    .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    })) // Output the file being created
    .pipe(bundleTimer) // Output time timing of the file creation
    .pipe(livereload()); // Reload the view in the browser
}

// Completes the final file outputs
function bundleProd(bundler) {
  var bundleTimer = duration('Javascript bundle time');

  bundler
    .bundle()
    .on('error', mapError) // Map error reporting
    .pipe(source(config.js.src)) // Set source name
    .pipe(buffer()) // Convert to gulp pipeline
    .pipe(rename(config.js.outputFile)) // Rename the output file
    .pipe(sourcemaps.init({loadMaps: true})) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
    .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    })) // Output the file being created
    .pipe(bundleTimer) // Output time timing of the file creation
}

function getBundler(willWatch) {
  if (willWatch) {
    const args = merge(watchify.args, { debug: true, extensions: ['.js','.json','.jsx'] }); // Merge in default watchify args with browserify arguments
    return browserify(config.js.src, args) // Browserify
      .plugin(watchify, {ignoreWatch: ['**/node_modules/**', '**/bower_components/**']}) // Watchify to watch source file changes
      .transform(babelify, {presets: ['es2015', 'react']}); // Babel tranforms    
  } else {
    const args = { debug: false, extensions: ['.js','.json','.jsx'] }; // Merge in default watchify args with browserify arguments
    return browserify(config.js.src, args) // Browserify
      .transform(babelify, {presets: ['es2015', 'react']}); // Babel tranforms    
  }

}

// Gulp task for build
gulp.task('default', ['copy-res'], function() {
  livereload.listen(); // Start livereload server

  let bundler = getBundler(true); 
  bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)

  bundler.on('update', function() {
    bundle(bundler); // Re-run bundle on source updates
  });
});

gulp.task('copy-css', () =>{
  return gulp.src('./node_modules/bootstrap/dist/css/**/*.min.css')
    .pipe(gulp.dest('./assets/styles'))
})

gulp.task('copy-fonts', () =>{
  return gulp.src('./node_modules/bootstrap/dist/fonts/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./assets/fonts'))
})

gulp.task('copy-res', ['copy-css', 'copy-fonts']);

gulp.task('build', ['copy-res'], () => {
  return bundleProd(getBundler(false));
})


// //https://gist.github.com/yannickcr/6129327b31b27b14efc5


// // Transform all required files with Babel
// require('babel/register');

// // Files to process
// var TEST_FILES = 'tests/**/*.js';
// var SRC_FILES = 'js/**/*.js';

// /*
//  * Instrument files using istanbul and isparta
//  */
// gulp.task('coverage:instrument', function() {
//   return gulp.src(SRC_FILES)
//     .pipe(istanbul({
//       instrumenter: isparta.Instrumenter // Use the isparta instrumenter (code coverage for ES6)
//       // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulopt)
//       // ...
//     }))
//     .pipe(istanbul.hookRequire()); // Force `require` to return covered files
// });

// /*
//  * Write coverage reports after test success
//  */
// gulp.task('coverage:report', function(done) {
//   return gulp.src(SRC_FILES, {read: false})
//     .pipe(istanbul.writeReports({
//       // Istanbul configuration (see https://github.com/SBoudrias/gulp-istanbul#istanbulwritereportsopt)
//       // ...
//     }));
// });

// /**
//  * Run unit tests
//  */
// gulp.task('test', function() {
//   return gulp.src(TEST_FILES, {read: false})
//     .pipe(mocha({
//       require: [__dirname + '/lib/jsdom'] // Prepare environement for React/JSX testing
//     }));
// });

// /**
//  * Run unit tests with code coverage
//  */
// gulp.task('test:coverage', function(done) {
//   runSequence('coverage:instrument', 'test', 'coverage:report', done);
// });

// /**
//  * Watch files and run unit tests on changes
//  */
// gulp.task('tdd', function(done) {
//   gulp.watch([
//     TEST_FILES,
//     SRC_FILES
//   ], ['test']).on('error', gutil.log);
// });