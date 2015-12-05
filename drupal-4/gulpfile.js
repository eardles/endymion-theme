var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var del = require('del');
var runSequence = require('run-sequence');

gulp.task('sass', function() {
  return gulp.src('./themes/custom/endymion/sass/*.scss') 
  .pipe(sass())
    .pipe(gulp.dest('./themes/custom/endymion/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
})

gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "localhost:85/drupal-4"
    });
})

gulp.task('clean',function(){
    del(['./themes/custom/endymion/sass/*.css']);
})

gulp.task('watch', ['browserSync', 'sass'], function (){
    gulp.watch('./themes/custom/endymion/sass/*.scss', ['sass', 'clean']);

  // Reloads the browser whenever HTML or JS files change
  //gulp.watch('*.html', browserSync.reload); 
  //gulp.watch('js/**/*.js', browserSync.reload); 
})

gulp.task('default', function(callback) {
  runSequence('clean', 'watch', callback);
});
