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
// var istanbul = require('gulp-istanbul');
// var isparta = require('isparta');
// var runSequence = require('run-sequence');

// Configuration for Gulp
var config = {
  js: {
    src: 'src/app.js',
    srcFiles: 'src/**/*.{jsx,js}',
    watch: 'src/**/*',
    outputDir: './assets/lib/',
    outputFile: 'bundle.js',
    extensions: ['.js', '.json', '.jsx', '.react.js']
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
    .pipe(sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
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
    .pipe(sourcemaps.init({ loadMaps: true })) // Extract the inline sourcemaps
    .pipe(sourcemaps.write('./map')) // Set folder for sourcemaps to output to
    .pipe(gulp.dest(config.js.outputDir)) // Set the output folder
    .pipe(notify({
      message: 'Generated file: <%= file.relative %>',
    })) // Output the file being created
    .pipe(bundleTimer) // Output time timing of the file creation
}

function getBundler(willWatch) {
  let presets = ['es2015', 'react'];

  if (willWatch) {
    const args = merge(watchify.args, { debug: true, extensions: config.js.extensions }); // Merge in default watchify args with browserify arguments
    return browserify(config.js.src, args) // Browserify
      .plugin(watchify, { ignoreWatch: ['**/node_modules/**', '**/bower_components/**'] }) // Watchify to watch source file changes
      .transform(babelify, { presets: presets }); // Babel tranforms    
  } else {
    const args = { debug: false, extensions: config.js.extensions }; // Merge in default watchify args with browserify arguments
    return browserify(config.js.src, args) // Browserify
      .transform(babelify, { presets: presets }); // Babel tranforms    
  }

}

// Gulp task for build
gulp.task('default', ['copy-res'], function () {
  livereload.listen(); // Start livereload server

  let bundler = getBundler(true);
  bundle(bundler); // Run the bundle the first time (required for Watchify to kick in)

  bundler.on('update', function () {
    bundle(bundler); // Re-run bundle on source updates
  });
});

gulp.task('copy-css', () => {
  return gulp.src('./node_modules/bootstrap/dist/css/**/*.min.css')
    .pipe(gulp.dest('./assets/styles'))
})

gulp.task('copy-fonts', () => {
  return gulp.src('./node_modules/bootstrap/dist/fonts/*.{ttf,woff,eof,svg}')
    .pipe(gulp.dest('./assets/fonts'))
})

gulp.task('copy-res', ['copy-css', 'copy-fonts']);

gulp.task('build', ['copy-res'], () => {
  return bundleProd(getBundler(false));
})


// //https://gist.github.com/yannickcr/6129327b31b27b14efc5


// Transform all required files with Babel
require('babel-register')({ extensions: config.js.extensions });

// Files to process
var TEST_FILES = './test/**/*-test.js';

/**
 * Run unit tests
 */
gulp.task('test', function () {
  return gulp.src(TEST_FILES, { read: false })
    .pipe(mocha({ require: ['./test/.setup.js'] }))
    .once('end', function (err) {
      console.log('✓ Done!', err);
      process.exit(process.exit(err ? 0 : 1));
    });
});

/**
 * Watch files and run unit tests on changes
 */
gulp.task('tdd', function (done) {
  gulp.watch([
    TEST_FILES,
    config.js.srcFiles
  ], ['test'])
    .on('error', gutil.log)
    .once('end', function (err) {
      console.log('✓ Done!', err);
      process.exit(process.exit(err ? 0 : 1));
    });
});

gulp.task('test:coverage', function (done) {
  gulp.doneCallback = function (err) {
    process.exit(err ? 1 : 0);
  }
  require('gulp-jsx-coverage').createTask({
    src: [
      TEST_FILES,
      'src/components/activity/*.jsx'
    ],          // will pass to gulp.src as mocha tests  
    isparta: false,                                  // use istanbul as default 
    istanbul: {                                      // will pass to istanbul or isparta 
      preserveComments: true,                      // required for istanbul 0.4.0+ 
      coverageVariable: '__MY_TEST_COVERAGE__',
      include: /\.(jsx|js)?$/,
      exclude: /node_modules|test/            // do not instrument these files 
    },

    threshold: [                                     // fail the task when coverage lower than one of this array 
      {
        type: 'lines',                           // one of 'lines', 'statements', 'functions', 'banches' 
        min: 30
      }
    ],

    transpile: {                                     // this is default whitelist/blacklist for transpilers 
      babel: {
        include: /\.jsx?$/,
        exclude: /node_modules/,
        omitExt: ['.jsx']                           // if you wanna omit file ext when require(), put an array 
      }
    },
    coverage: {
      reporters: ['text', 'text-summary', 'json', 'lcov', 'html'], // list of istanbul reporters 
      directory: 'coverage'                        // will pass to istanbul reporters 
    },
    mocha: {                                         // will pass to mocha 
      reporter: 'spec',
      require: ['./test/.setup.js']
    },

    // Recommend moving this to .babelrc 
    babel: {                                         // will pass to babel-core 
      presets: ['es2015', 'react'],                // Use proper presets or plugins for your scripts 
      sourceMap: 'both'                            // get hints in covarage reports or error stack 
    },

    //optional 
    cleanup: function () {
      // do extra tasks after test done 
      // EX: clean global.window when test with jsdom
      global.window = undefined;
      global.navigator = undefined;
      global.document = undefined;
      done();
    }
  })()
});