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

gulp.task('service-worker', function(callback) {
  swPrecache.write(path.join(paths.build, 'service-worker.js'), {
    staticFileGlobs: [
      paths.build + '*'
    ],
    importScripts: [
      'scripts/sw-toolbox.js'
    ],
    stripPrefix: paths.build
  }, callback);
});

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

gulp.task('processReact', function() {
  gulp.src(path.join(paths.src, 'react/*.jsx'))
  .pipe(sourcemaps.init())
  .pipe(webpack(require('./webpack.config.js')))
  //.pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.join(paths.build, 'react')));
});

gulp.task('processLESS', function() {
  gulp.src(path.join(paths.src, 'styles/*.less'))
  .pipe(sourcemaps.init())
  .pipe(less({ plugins: [lessAutoprefix]}))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest(path.join(paths.build, 'styles')));
});

gulp.task('build', ['processLESS', 'processJS', 'processReact', 'processAssets', 'processHTML', 'processPWA', 'service-worker']);

gulp.task('default', ['serve']);


gulp.task('serve', ['build'], function() {
  browserSync.init({
    server: paths.build,
    port: 3000
  });
  gulp.watch(path.join(paths.src,'styles/**/*.less'), ['processLESS']).on('change', browserSync.reload);
  gulp.watch(path.join(paths.src,'scripts/**/*.js'), ['processJS']).on('change', browserSync.reload);
  gulp.watch(path.join(paths.src,'react/**/*.jsx'), ['processReact']).on('change', browserSync.reload);
  gulp.watch(path.join(paths.src,'*.html'), ['processHTML']).on('change', browserSync.reload);
});
