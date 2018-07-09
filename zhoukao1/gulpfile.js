var gulp = require('gulp');
var url = require('url');
var path = require('path');
var fs = require('fs');
var server = require('gulp-webserver');
var sass = require('gulp-sass');
var mincss = require('gulp-clean-css');
var minjs = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                var pathname = pathname === '/' ? 'index.html' : pathname;
                res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)))
            }
        }))
});
// sass 
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(sass())
        .pipe(mincss())
        .pipe(gulp.dest('bulit/css'))

});
gulp.task('watch', function() {
        gulp.watch('./src/scss/*.scss', ['scss']);
    })
    // js
gulp.task('minjs', function() {
    gulp.src('./src/js/*.js')
        .pipe(minjs())
        .pipe(gulp.dest('bulit/js'))

});
// html
gulp.task('htmlmin', function() {
    gulp.src('./src/*.html')
        .pipe(htmlmin())
        .pipe(gulp.dest('bulit'))

})