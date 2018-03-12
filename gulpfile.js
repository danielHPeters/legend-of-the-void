'use strict'

const gulp = require('gulp')
const esLint = require('gulp-eslint')

// Define sources, destination and config file locations here
const configuration = {
  js: {
    source: '**/*.js'
  },
  esLint: {
    config: '.eslintrc'
  }
}

/**
 * Lint all js source files.
 * The standard used is standard.js as defined in the '.eslintrc' file
 * with the addition of server.io globals
 */
gulp.task('lint', () => {
  return gulp.src([configuration.js.source, '!node_modules/**', '!public/**'])
    .pipe(esLint({
      configFile: configuration.esLint.config
    }))
    .pipe(esLint.format())
    .pipe(esLint.failAfterError())
})

/**
 * Default task to perform all previously defined tasks
 */
gulp.task('default', ['lint'])
