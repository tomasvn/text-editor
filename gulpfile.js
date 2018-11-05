/*
Basic Gulp Workflow v0.7.3
Created by: Ngoc Tu Nguyen <nguyenngoct2112@gmail.com>
Github Repo: https://github.com/tomasvn/gulp-project.git
**/

/*
Gulp Plugins
**/

var gulp = require('gulp')
var gulpConfig = require('./gulp-config.js')
var sass = require('gulp-sass')
var autoprefixer = require('gulp-autoprefixer')
var cssnano = require('gulp-cssnano')
var browserSync = require('browser-sync').create() // Create browser sync instance
var del = require('del')
var uglify = require('gulp-uglify')
var gulpIf = require('gulp-if')
var imagemin = require('gulp-imagemin')
var runSequence = require('run-sequence')
var size = require('gulp-size')
var surge = require('gulp-surge')
var babel = require('gulp-babel')
var maps = require('gulp-sourcemaps')
var concat = require('gulp-concat')
var useref = require('gulp-useref')
var surge = require('gulp-surge')

/**
Gulp config variables
*/

var src = gulpConfig.paths.src
var dist = gulpConfig.paths.dist
var distRoot = gulpConfig.paths.distRoot
var srcRoot = gulpConfig.paths.srcRoot

/**
Developement Tasks
*/

gulp.task('dev:styles', () => { // First argument is the name of the task, second argument callback function
  return gulp.src(src.stylesFiles) // Look into this folder for any SCSS files
    .pipe(sass())
    .pipe(sass.sync().on('error', sass.logError)) // If SCSS syntax has any error output it to the CLI
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest(src.stylesOutput)) // Compile SCSS files into one CSS file, output it here
    .pipe(browserSync.stream())
})

gulp.task('watch', ['dev:styles'], () => {
  browserSync.init({ // Initialize browser sync
    server: srcRoot // Input folder we want to serve to the browser
  })

  gulp.watch(src.stylesFiles, ['dev:styles']) // Watch - it will run the styles task on file change
  gulp.watch(src.htmlFiles).on('change', browserSync.reload) // Watch changes in HTML file and reload it browser
})

/**
Clean Tasks
*/

gulp.task('clean:dev', () => {
  return del([src.stylesOutput])
})

gulp.task('clean', () => {
  return del(['dist']) // Delete dist folder
})

/**
Build Tasks
*/

gulp.task('build:html', () => {
  return gulp.src(src.htmlFiles)
    .pipe(gulp.dest(distRoot))
})

gulp.task('build:js', () => {
  return gulp.src(src.jsFiles)
    .pipe(maps.init())
    .pipe(concat('main.min.js')) // Concat files to single file
    .pipe(babel())
    .pipe(uglify()) // Minify only if it is a JS file
    .pipe(size())
    .pipe(maps.write('../maps'))
    .pipe(gulp.dest(dist.jsDist))
})

gulp.task('build:styles', () => {
  return gulp.src(src.stylesFiles)
    .pipe(maps.init())
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 5 versions'],
      cascade: false
    }))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(size())
    .pipe(maps.write('../maps'))
    .pipe(gulp.dest(dist.stylesDist))
})

gulp.task('build:fonts', () => {
  return gulp.src(src.fontsFiles)
    .pipe(gulp.dest(dist.fontsDist))
})

gulp.task('optimize', () => {
  return gulp.src(src.imgFiles)
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.jpegtran({progressive: true}),
      imagemin.optipng({optimizationLevel: 5}),
      imagemin.svgo({
        plugins: [{removeDoctype: true}, {removeDesc: true}, {removeViewBox: true}]
      })
    ]))
    .pipe(gulp.dest(dist.imgDist))
})

gulp.task('build', function (callback) {
  runSequence('clean', ['build:html', 'build:styles', 'build:js', 'build:fonts', 'optimize'],
    callback
  )
})

gulp.task('deploy', function() {
  return surge({
    project: './dist',
    domain: 'text-editor.surge.sh'
  })
})
