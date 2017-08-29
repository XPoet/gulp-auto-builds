/*
* 利用gulp实现前端自动化工作流 - 简易版
* Author：itPoet
* 1、 LESS编译 压缩 --合并（利用Less预编译导包@import）
* 2、 JavaScript合并 压缩混淆
* 3、 image复制
* 4、 HTML压缩
* 5、 浏览器服务
* 6、 gulp监视文件改变
* */

'use strict';
var gulp = require('gulp');
var less = require('gulp-less');
var cssnano = require('gulp-cssnano');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var browserSync = require('browser-sync');

// 1、LESS编译 压缩
gulp.task('css', function () {
    gulp.src(['src/css/*.less', '!src/css/_*.less'])
        .pipe(less())
        .pipe(cssnano())
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 2、 JavaScript合并 压缩混淆
gulp.task('js', function () {
    gulp.src('src/js/*.js')
        .pipe(concat('index.js')) // JS合并之后，文件命名为index.js
        .pipe(uglify())  // JS压缩混淆
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.reload({
            stream: true
        }));

});

// 3、 image复制
gulp.task('img', function () {
    gulp.src('src/img/*.*')
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.reload({
            stream: true
        }));

});

// 4、 HTML压缩
gulp.task('html', function () {
    gulp.src('src/*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

// 5、开启浏览器服务
    gulp.task('browserSync', function () {
        browserSync({
            server: {
                baseDir: ['dist']
            }

        }, function (err, bs) {
            console.log(bs.options.getIn(["urls", "local"]));
        });
        // 6、 开启gulp监视
        gulp.watch('src/css/*.less', ['css']);
        gulp.watch('src/js/*.js', ['js']);
        gulp.watch('src/img/*.*', ['img']);
        gulp.watch('src/*.html', ['html']);
    });




