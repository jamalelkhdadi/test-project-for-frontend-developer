const gulp = require('gulp');
const concat = require('gulp-concat');
const cleanCss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const prettify = require('gulp-html-prettify');
const sass = require('gulp-sass')(require('sass'));
const imagemin = require('gulp-imagemin');
const svgo = require('gulp-svgo');
const htmlmin = require('gulp-htmlmin');


// prettify html files
gulp.task('templates', () => {
  return gulp.src('src/*.html')
    .pipe(prettify({indent_char: ' ', indent_size: 4}))
    .pipe(gulp.dest('./dist/'));
});

// Concat and minify CSS files
gulp.task('build-css', () => {
    return gulp.src('src/css/*.css')
    .pipe(concat('app.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('dist/css'));
});

// copy bootstrap from node_modules
gulp.task('bootstrap-css', () => {
    return gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css')
        .pipe(gulp.dest('dist/css'));
});
gulp.task('bootstrap-js', () => {
    return gulp.src('node_modules/bootstrap/dist/js/bootstrap.bundle.min.js')
        .pipe(gulp.dest('dist/js'));
});

// images
gulp.task('img', () => {
    return gulp.src('src/img/*.png')
        .pipe(imagemin())
	       	.pipe(gulp.dest('dist/img'));
});

// svg
gulp.task('svg', () => {
    return gulp.src('src/img/*.svg')
        .pipe(svgo())
        .pipe(gulp.dest('dist/svg'));
});

// fonts
gulp.task('font', () => {
    return gulp.src('src/fonts/*.*')
	       	.pipe(gulp.dest('dist/fonts'));
});

gulp.task('build', gulp.series('templates', 'build-css', 'bootstrap-css', 'bootstrap-js', 'img', 'svg', 'font'));



/*
// Concat and minify specific JS files
gulp.task('build-js', () => {
    return gulp.src(['src/js/ajax.js', 
                     'src/js/main.js'])
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});

gulp.task('min-html', () => {
  return gulp.src('src/*.html')
    .pipe(htmlmin())
    .pipe(gulp.dest('dist'));
});
*/
