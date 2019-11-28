var gulp = require('gulp'),
    concat = require('gulp-concat'),
    cssminify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imgmin = require('gulp-imagemin'),
    rename = require('gulp-rename')

gulp.task('uglifyjs',function(){
    gulp.src('src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'))
})

gulp.task('cssminify',function(){
    gulp.src(['src/css/task15-3.css','src/css/task39.css'])
        .pipe(cssminify())
        .pipe(concat('all.js'))
        .pipe(rename('merge.min.css'))
        .pipe(gulp.dest('dist/css'))
})

gulp.task('imgmin',function(){
    gulp.src('src/images/**/*')
        .pipe(imgmin({
        progressive:true
    }))
        .pipe(gulp.dest('dist/images'))
})

gulp.task('default',['uglifyjs','cssminify','imgmin'])