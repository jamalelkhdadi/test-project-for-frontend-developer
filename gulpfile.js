const gulp = require('gulp');
const prettify = require('gulp-html-prettify');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass')(require('sass'));
const cssbeautify = require('gulp-cssbeautify');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const svgo = require('gulp-svgo');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const serve = require('gulp-serve');


// prettify html files
gulp.task('html-prettify', () => {
   return gulp.src('src/*.html')
    .pipe(prettify({indent_char: ' ', indent_size: 4}))
    .pipe(gulp.dest('./build/'));
});

// minify html files
gulp.task('html-minify', () => {
  return gulp.src('build/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('./dist/'));
});

// sass to css
gulp.task('scss-build', () => {
  return gulp.src('src/scss/main.scss')
    //gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./build/css/'));
});

// font to css require
gulp.task('font-to-css', () => {
  return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('./build/fonts'));
});

// fonts
gulp.task('font', () => {
  return gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('./dist/fonts'));
});

// prettify css files
gulp.task('css-prettify', () => {
  return gulp.src('./build/css/*.css')
    .pipe(cssbeautify({
      indent: '    ',
      //openbrace: 'separate-line',
      autosemicolon: true
    }))
    .pipe(gulp.dest('./build/css'));
});

// Concat and minify CSS files
gulp.task('css-minify', () => {
  return gulp.src('./build/css/*.css')
    .pipe(concat('main.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/css'));
});

// svg
gulp.task('svg', () => {
  return gulp.src('src/img/*.svg')
    .pipe(svgo())
    .pipe(gulp.dest('./dist/img'));
});

// images png
gulp.task('imgs-png', () => {
  return gulp.src('src/img/*.png')
    .pipe(imagemin())
    .pipe(gulp.dest('./dist/img'));
});

// copy bootstrap from node_modules
gulp.task('bootstrap-css', () => {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('./dist/css'));
});
gulp.task('bootstrap-js', () => {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(gulp.dest('./dist/js'));
});




/*
// Concat and minify specific JS files
gulp.task('js-build', () => {
  return gulp.src(['src/js/script.js', 'src/js/main.js'])
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
});
*/



// run dist localy
gulp.task('serve', serve('dist'));

// build project
gulp.task('build', gulp.series(
  'html-prettify',
  'html-minify',
  'font-to-css',
  'font',
  'scss-build',
  'css-prettify',
  'css-minify',
  'svg',
  'imgs-png',
  'bootstrap-css',
  'bootstrap-js'
));
