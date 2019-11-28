	var gulp = require('gulp');

//用法 gulp.src | gulp.dest | gulp.task | gulp.watch


//html压缩
	var htmlmin = require('gulp-htmlmin');
	 
	gulp.task('html', function() {
	  	return gulp.src('src/*.html')
		    .pipe(htmlmin({collapseWhitespace: true}))
		    .pipe(gulp.dest('dist'));
	});


// css 压缩合并
	var cssnano = require('gulp-cssnano');
	var concat = require('gulp-concat');

	gulp.task('css', function () {
	    gulp.src('./src/css/*.css')
	    	.pipe(concat('index-merge.css'))	//合并
	        .pipe(cssnano())					//css压缩
	        .pipe(gulp.dest('./dist/css/'));
	});


// js 合并压缩
	var jshint = require('gulp-jshint');  	//js 检查
	var uglify = require('gulp-uglify');  	//js 压缩

	gulp.task('js',function () {
		// gulp.src(['./src/js/carousel.js','./src/js/form.js','./src/js/gotop.js','./src/js/main.js'])
		gulp.src('./src/js/*.js')
			.pipe(jshint())
			// .pipe(jshint.reporter('default'))
			.pipe(concat('index.js'))
			.pipe(uglify())
			.pipe(gulp.dest('./dist/js/'));
	});


//图片压缩
	var imagemin = require('gulp-imagemin'); 

	gulp.task('img', function () {
	        gulp.src('src/img/*')
	            .pipe(imagemin())
	            .pipe(gulp.dest('dist/img'));
	    });



// 监控文件变动
	gulp.task('watch',function () {
		gulp.watch(['src/*.html','src/**/*.js','src/**/*.css'],['html','css','js'])
	});

// 自动化
	gulp.task('build',['html','css','js','img']);



