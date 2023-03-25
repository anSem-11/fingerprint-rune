const {src, dest, series, watch, parallel} = require('gulp');

const browserSync = require('browser-sync').create(),
    sass = require('gulp-sass'),
    plumber = require('gulp-plumber'),
    prefix = require('gulp-autoprefixer'),
    base64 = require('gulp-css-base64'),
    cssnano = require('gulp-cssnano'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require("gulp-rename"),
    // concat = require("gulp-concat"),
    babel = require('gulp-babel');

const ASSETS_PATH = '.',
    TWIG_PATH = 'templates',
    SITE_URL = 'eh.tsibizova/landing/daily-tarot-reading';

function prefixFun() {
    return src(`${ASSETS_PATH}/css/**/*.css`)
        .pipe(plumber())
        .pipe(prefix({
            overrideBrowserslist: ['last 10 versions']
        }))
        .pipe(dest(`${ASSETS_PATH}/css`))
}

function sassFun() {
    return src(`${ASSETS_PATH}/scss/**/*.scss`)
        .pipe(plumber())
        .pipe(sass())
        .pipe(dest(`${ASSETS_PATH}/css/`))
        .pipe(browserSync.stream());
}

function compressJSFun() {
    return src([
        `${ASSETS_PATH}/js/src/**/*.js`,
        `!${ASSETS_PATH}/js/src/**/*.min.js`
    ])
        .pipe(plumber())
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(`${ASSETS_PATH}/js/build`));
}

function compressCSSFun() {
    return src([
        `${ASSETS_PATH}/css/**/*.css`,
        `!${ASSETS_PATH}/css/**/*.min.css`
    ])
        .pipe(plumber())
        .pipe(cssnano({
            autoprefixer: false,
            zindex: false,
            reduceIdents: false
        }))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(dest(`${ASSETS_PATH}/css/`));
}

function base64Fun() {
    return src([
        `${ASSETS_PATH}/css/**/*.css`,
        `!${ASSETS_PATH}/css/**/*.min.css`
    ])
        .pipe(plumber())
        .pipe(base64({
            extensionsAllowed: ['.gif', '.jpg', '.png', '.svg'],
            maxWeightResource: 4 * 1024
        }))
        .pipe(dest(`${ASSETS_PATH}/css/`));
}

function compressImgFun() {
    return src(`${ASSETS_PATH}/img/**`)
        .pipe(plumber())
        .pipe(imagemin([imagemin.jpegtran(), imagemin.optipng(), imagemin.svgo()], {
            progressive: true
        }))
        .pipe(dest(`${ASSETS_PATH}/img`))
}

function watchFun() {
    watch(`${ASSETS_PATH}/css/**/*`, browserSync.reload);
    watch([`${ASSETS_PATH}/scss/**/*.scss`], sassFun);
    watch([
        `${TWIG_PATH}/**`,
        `${ASSETS_PATH}/js/**/*.js`
    ], browserSync.reload);
}

function browserSyncFun() {
    let files = [
        `${TWIG_PATH}/**`,
        `${ASSETS_PATH}/css/**`,
        `${ASSETS_PATH}/js/**`,
        `${ASSETS_PATH}/css/**`
    ];
    browserSync.init(files ,{
        proxy: SITE_URL,
        port: 80,
        notify: false
    });
}

// ------------ BEGIN: TASKS ---------------
exports.local = parallel(watchFun, browserSyncFun);
exports.build = series(sassFun, prefixFun, base64Fun, compressCSSFun, compressJSFun);
exports.sass = sassFun;
// ------------ END: TASKS ---------------
