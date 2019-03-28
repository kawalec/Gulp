const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const browserSync = require('browser-sync');

var paths = {
    styles: {
      src: 'src/styles/*.sass',
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
        server: 'src'
    });

    gulp.watch('./src/*.html', reload)
};

function styles() {
    return gulp
    .src(paths.styles.src)
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest(paths.styles.dest));
};

function copy() {
    return gulp
    .src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest))
};

const clean = () => del('./dest/**');

const build = gulp.series(clean, gulp.parallel(styles, copy));
// gulp.series('task1', 'taks2')    -   szeregowo
// gulp.parallel('task3', 'task4')  -   równolegle

exports.reload = reload;
exports.serv = serv;
exports.styles = styles;
exports.copy = copy;
exports.clean = clean;
exports.build = build;

exports.default = serv;