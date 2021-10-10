const { src, parallel, series } = require('gulp');
var gulp = require('gulp');
var sass = require('gulp-sass')(require('sass'));
var imagemin = require('gulp-imagemin');
var notify = require('gulp-notify');
var webp = require('gulp-webp');
var concat = require('gulp-concat');

const paths = {
  imagenes: 'src/img/**/*',
  scss: 'src/scss/**/*.scss',
  js: 'src/js/**/*.js'
}


// Utilidades CSS
var autoprefixer = require('autoprefixer');
var postcss = require('gulp-postcss');
var cssnano = require('cssnano');
var sourcemaps = require('gulp-sourcemaps')

// Utilidades JS
var terser = require('gulp-terser-js');
var rename = require('gulp-rename');



function ncss() {
  return gulp.src(paths.scss)
    .pipe( sourcemaps.init())
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./build/css'));
};

function javascript() {
  return src(paths.js)
    .pipe(sourcemaps.init())
    .pipe(concat('bundle.js'))
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(rename({ suffix: '.min'}))
    .pipe(gulp.dest('./build/js'));
}

function imagenes() {
  return src(paths.imagenes)
    .pipe(imagemin())
    .pipe(gulp.dest('./build/img'))
    .pipe(notify({ message: 'Imagen minificada' }));
}

function versionWebp() {
  return src(paths.imagenes)
    .pipe(webp())
    .pipe(gulp.dest('./build/img'))
    .pipe(notify({ message: 'Version webP lista' }));
}

function watch() {               //ACTIVAR CADA QUE INICIES EL PROYECTO
  gulp.watch(paths.scss, ncss);  // * = La carpeta actual - ** = Todos los archivos con esa extensión
  gulp.watch(paths.js, javascript);
};

exports.ncss = ncss;
exports.imagenes = imagenes;
exports.watch = watch;

exports.default = series(ncss, javascript, imagenes, versionWebp, watch);