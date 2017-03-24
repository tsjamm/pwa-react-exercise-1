var gulp = require('gulp');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync');
var less = require('gulp-less');
var lessPluginAutoprefix = require('less-plugin-autoprefix');
var lessAutoprefix = new lessPluginAutoprefix({ browsers: ['last 2 versions'] });
var path = require('path');
var swPrecache = require('sw-precache');
var babel = require('gulp-babel');
var webpack = require('webpack-stream');

var paths = {
  base: './',
  src: './src/',
  build: './build/'
};

// Insert Service Worker sw-precache generator here

gulp.task('processHTML', function() {
  gulp.src(path.join(paths.src, '*.html'))
  .pipe(gulp.dest(path.join(paths.build)));
});

gulp.task('processPWA', function() {
  gulp.src(path.join(paths.src, 'manifest.json'))
  .pipe(gulp.dest(path.join(paths.build)));
  gulp.src(path.join(paths.src, 'favicon.ico'))
  .pipe(gulp.dest(path.join(paths.build)));
});

gulp.task('processAssets', function() {
  gulp.src(path.join(paths.src, '/assets/**/*'))
  .pipe(gulp.dest(path.join(paths.build,'assets')));
});

gulp.task('processJS', function() {
  gulp.src(path.join(paths.src, 'scripts/*.js'))
  .pipe(sourcemaps.init())
  .pipe(babel({ presets: ['latest']}))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.join(paths.build, 'scripts')));
});

/// React Files Processor goes here

gulp.task('processLESS', function() {
  gulp.src(path.join(paths.src, 'styles/*.less'))
  .pipe(sourcemaps.init())
  .pipe(less({ plugins: [lessAutoprefix]}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.join(paths.build, 'styles')));
});

//// Gulp Watcher goes here