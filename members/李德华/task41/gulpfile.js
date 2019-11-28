var gulp = require('gulp');

var minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    imagemin = require('gulp-imagemin');

gulp.task('css', function() {
  return gulp.src('css/*.css')
  .pipe(concat('merge.min.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('dist/css/'));
});
gulp.task('js', function() {
  return gulp.src('scripts/*.js')
  .pipe(concat('merge.min.css'))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js/'));
});
gulp.task('image', function() {
  return gulp.src('Resources/*')
  .pipe(imagemin())
  .pipe(gulp.dest('dist/imgs'));
});
gulp.task('build',['css','js','image']);
