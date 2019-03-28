const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const browserSync = require('browser-sync');

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
    browserSync({
        server: 'dest'
    });
    gulp.watch('./dest/*', reload);
    gulp.watch('./src/**/*', build);
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
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.styles.dest))
};

function copyJs() {
    return gulp
    .src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest))
};



const build = gulp.series(clean, gulp.parallel(styles, copy, copyJs));
// gulp.series('task1', 'taks2')    -   szeregowo
// gulp.parallel('task3', 'task4')  -   równolegle

exports.reload = reload;
exports.serv = serv;
exports.styles = styles;
exports.copy = copy;
exports.copyJs = copyJs;
exports.clean = clean;
exports.build = build;

exports.default = serv;