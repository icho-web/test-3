var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var server = require('browser-sync').create();
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var csso = require('gulp-csso');
var rename = require('gulp-rename');
var del = require('del');
var webp = require('gulp-webp');
var svgstore = require('gulp-svgstore');
var pug = require('gulp-pug');

gulp.task('pug', function buildHTML() {
  return gulp.src('source/*.pug')
  .pipe(pug({
  }))
  .pipe(gulp.dest('build'));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task('sprite', function () {
  return gulp.src('source/svg/*.svg')
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
});

gulp.task('webp', function () {
  return gulp.src('source/img/**/*.{png,jpg}')
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest('build/img'));
});

gulp.task('css', function () {
  return gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([
    autoprefixer()
  ]))
  .pipe(csso())
  .pipe(rename('style.min.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('build/css'))
  .pipe(server.stream());
})

gulp.task('refresh', function (done) {
  server.reload();
  done();
});

gulp.task('server', function () {
  server.init({
    server: 'build/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/sass/**/*.{scss,sass}', gulp.series('css'));
  gulp.watch('source/*.pug', gulp.series('pug', 'refresh'));
  gulp.watch('source/modules/*.pug', gulp.series('pug', 'refresh'));
  gulp.watch('source/js/*.js', gulp.series('copy', 'refresh'));
  gulp.watch('source/svg/*.svg', gulp.series('sprite', 'copy', 'refresh'));
  gulp.watch('source/img/**', gulp.series('webp', 'copy', 'refresh'));
});

gulp.task('copy', function () {
  return gulp.src([
    'source/img/**',
    'source/js/**',
    'source/fonts/**',
    'source/json/**'
  ], {
    base: 'source'
  })
    .pipe(gulp.dest('build'));
});

gulp.task('build', gulp.series(
  'clean',
  'sprite',
  'webp',
  'copy',
  'css',
  'pug'
));

gulp.task('start', gulp.series('build', 'server'));
