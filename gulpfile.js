/*
Basic Gulp Workflow v0.7.3
Created by: Ngoc Tu Nguyen <nguyenngoct2112@gmail.com>
Github Repo: https://github.com/tomasvn/gulp-project.git
**/

/*
Gulp Plugins
**/

let gulp = require('gulp')
let gulpConfig = require('./gulp-config.js')
let sass = require('gulp-sass')
let autoprefixer = require('gulp-autoprefixer')
let cssnano = require('gulp-cssnano')
let browserSync = require('browser-sync').create() // Create browser sync instance
let del = require('del')
let uglify = require('gulp-uglify')
let gulpIf = require('gulp-if')
let imagemin = require('gulp-imagemin')
let runSequence = require('run-sequence')
let size = require('gulp-size')
let surge = require('gulp-surge')
let babel = require('gulp-babel')
let maps = require('gulp-sourcemaps')
let concat = require('gulp-concat')
let useref = require('gulp-useref')

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
    .pipe(concat('app.js')) // Concat files to single file
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
