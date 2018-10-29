module.exports = {
  paths: {
    src: {
      imgFiles: './src/images/*.+(png|jpg|gif|svg)',
      stylesFiles: './src/scss/*.scss',
      stylesOutput: './src/styles',
      htmlFiles: './src/*.html',
      jsFiles: 'src/js/*.js',
      fontsFiles: '.src/fonts/**/*'
    },
    dist: {
      imgDist: './dist/images',
      stylesDist: 'dist/styles',
      jsDist: './dist/js/',
      fontsDist: '/dist/fonts',
      maps: 'maps'
    },
    srcRoot: './src',
    distRoot: './dist'
  }
}
