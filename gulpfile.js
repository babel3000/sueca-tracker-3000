//CSS Compiler

const gulp = require("gulp")
const { src, dest, series } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const css = () => {
  return src("./src/styles/*.sass")
    .pipe(sass().on("error", sass.logError))
    .pipe(dest("./dist/assets/"));
}
exports.css = css;


const fonts = () => {
  return src("./src/fonts/*").pipe(dest("./dist/assets/fonts"))
}

exports.fonts = fonts;

//Images

const images = () => {
  return src("./src/images/*").pipe(dest("./dist/assets/images"))
}

exports.images = images;

//JS Compiler

const concat = require("gulp-concat");
const js = () => {
  return src("./src/js/*.js")
    .pipe(concat("script.js"))
    .pipe(dest("./dist/assets/"));
}
exports.js = js;

//HTML Compiler

const pug = require("gulp-pug");
const html = () => {
  return src("./src/pug/views/*.pug")
    .pipe(pug({pretty: true,}))
    .pipe(dest("./dist"));
}
exports.html = html;



//Server

const browserSync = require('browser-sync').create();

// Static server
const serve = () => {

    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    })
    
    gulp.watch("./src/styles/**/*.sass", css).on('change', browserSync.reload);
    gulp.watch("./src/pug/**/*.pug", html).on('change', browserSync.reload);
    gulp.watch("./src/js/*.js", js).on('change', browserSync.reload);
    gulp.watch("./src/images/*.*", images).on('change', browserSync.reload);
};

exports.serve = series(html, css, fonts, js, serve, images);