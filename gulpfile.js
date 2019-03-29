const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const browserSync = require('browser-sync');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');

var paths = {
    html: {
        src:'src/**/*.html',
        dest: 'dest'
    },
    styles: {
      src: 'src/styles/**/*.sass',
      dest: 'dest/styles/'
    },
    scripts: {
      src: './src/scripts/**/*.js',
      dest: './dest/scripts/'
    },
    images: {
        src: './src/images/**/*.{jpg,jpeg,png}',
        dest: './dest/img/'
    }
};

function reload() {
    browserSync.reload();
};

function serv() {
    browserSync.init({
        server: {baseDir: './dest'}
    })
    gulp.watch('./src/**/*', build)
    gulp.watch('./dest/*', reload)
};


const clean = () => del('./dest/**');

function copy() {
    return gulp
    .src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browserSync.stream())
};

function styles() {
    return gulp
    .src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(concat('style.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.styles.dest))
};

function babelJS() {
    return gulp
    .src(paths.scripts.src)
    .pipe(concat('index.js'))
    .pipe(babel({presets: ['@babel/env']}))
    .pipe(gulp.dest(paths.scripts.dest))
};



const build = gulp.series(clean, gulp.parallel(copy, styles, babelJS));

exports.reload = reload;
exports.serv = serv;
exports.styles = styles;
exports.copy = copy;
exports.babelJS = babelJS;
exports.clean = clean;
exports.build = build;

exports.default = serv;