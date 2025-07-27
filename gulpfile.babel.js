import gulp from 'gulp';
import autoPrefixer from 'gulp-autoprefixer';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import { deleteAsync } from 'del';
import browserSync from 'browser-sync';

const sass = gulpSass(dartSass);
const bsInstance = browserSync.create();

const paths = {
  html: {
    src: './src/**/*.html',
    dest: './dist',
  },
  styles: {
    src: './src/assets/sass/**/*.scss',
    dest: './dist/css',
  },
  images: {
    src: './src/images/**',
    dest: './dist/images',
  },
  fonts: {
    src: './src/assets/webfonts/**/*',
    dest: './dist/webfonts',
  },
  scripts: {
    src: './src/assets/js/**/*.js',
    dest: './dist/js',
  },
};

async function clean(done) {
  await deleteAsync('./dist/**');
  done();
}

function html() {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
}

function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoPrefixer({
      cascade: false,
    }))
    .pipe(gulp.dest(paths.styles.dest));
}

function images() {
  return gulp.src(paths.images.src, { encoding: false })
    .pipe(gulp.dest(paths.images.dest));
}

function fonts() {
  return gulp.src(paths.fonts.src, { encoding: false })
    .pipe(gulp.dest(paths.fonts.dest));
}

function javascript() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest));
}

function bsInit(done) {
  bsInstance.init({
    server: { baseDir: './dist' },
    notify: {
      styles: { top: 'auto', bottom: 0 },
    },
  });
  done();
}

function bsReload(done) {
  bsInstance.reload();
  done();
}

const build = gulp.parallel(html, styles, images, fonts, javascript);

const buildClean = gulp.series(clean, build);

function watch() {
    gulp.watch(
      [paths.styles.src, paths.scripts.src, paths.images.src, paths.fonts.src],
      gulp.parallel(styles, javascript, images, fonts)
    );
}

function bsWatch() {
  gulp.watch(paths.html.src, gulp.series(html, bsReload));
  gulp.watch(
    [paths.styles.src, paths.scripts.src, paths.images.src, paths.fonts.src],
    gulp.series(gulp.parallel(styles, javascript, images, fonts), bsReload)
  );
}

const serve = gulp.series(build, bsInit, bsWatch);

export { buildClean, build, watch, serve };
export default build;
