let gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename');

gulp.task('scss', function(){
    return gulp.src('app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))    
    .pipe(gulp.dest('app/css'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('css', function(){
    return gulp.src([
      'node_modules/slick-carousel/slick/slick.css',
      'node_modules/slick-carousel/slick/slick-theme.css',
      'node_modules/fullpage.js/dist/fullpage.css',
      'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.css',
      'node_modules/wowjs/css/libs/animate.css',
    ])
      .pipe(concat('_libs.scss'))
      .pipe(gulp.dest('app/scss'))
      .pipe(browserSync.reload({stream: true}))
  });

gulp.task('html', function(){
    return gulp.src('app/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('script', function(){
    return gulp.src('app/js/*.js')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('js', function(){
    return gulp.src([
        'node_modules/slick-carousel/slick/slick.js',
        'node_modules/@fancyapps/fancybox/dist/jquery.fancybox.min.js',
        'node_modules/fullpage.js/dist/fullpage.min.js',
        'node_modules/wowjs/dist/wow.min.js',
        // 'node_modules/magnific-popup/dist/jquery.magnific-popup.js',
        // 'node_modules/jquery-nice-select/js/jquery.nice-select.js'
    ])
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "app/"
        }
    });
});

gulp.task('watch',function(){
    gulp.watch('app/scss/**/*.scss', gulp.parallel('scss'))
    gulp.watch('app/*.html', gulp.parallel('html'))
    gulp.watch('app/js/*.js', gulp.parallel('script'))
});

gulp.task('default', gulp.parallel('scss', 'js', 'browser-sync', 'watch'))