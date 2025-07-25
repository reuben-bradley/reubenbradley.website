import gulp from 'gulp';
import autoPrefixer from 'gulp-autoprefixer';
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';

const sass = gulpSass(dartSass);

const paths = {
  html: {
    src: './src/*.html',
    dest: './dist',
  },
  styles: {
    src: './src/assets/sass/*.scss',
    dest: './dist/css',
  },
};


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
};

function build(done) {
    // TODO: Why does series not work here??
    //gulp.series(html, styles);
    //return done();
    return html();
};

function watch() {
    gulp.watch(paths.styles.src, styles);
};

export { build, watch };
export default build;
