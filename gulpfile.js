var gulp            = require('gulp');
var concatCSS       = require('gulp-concat-css');
var minifyCSS       = require('gulp-minify-css');
var rename          = require('gulp-rename');
var autoprefixer    = require('gulp-autoprefixer');
var livereload      = require('gulp-livereload');
var connect         = require('gulp-connect');
var opn             = require('opn');
var wiredep         = require('wiredep').stream;
var sass            = require('gulp-sass');
//var sprite          = require('gulp-sprite-generator');

gulp.task('default', ['connect', 'html', 'css', 'watch']);

gulp.task('sass', function () {
    gulp.src('app/sass/*.scss')
        .pipe(sass())
        .pipe(minifyCSS({keepBreaks: true, advanced: false, compatibility: 'ie8'} ))
        .pipe(autoprefixer("last 10 versions"))
        .pipe(gulp.dest('app/css'))
        .pipe(connect.reload());
});

gulp.task('css', function () {
    return gulp.src('app/css/*.css')
        //.pipe(sass())
        //.pipe(concatCSS("bandle.css"))
        .pipe(autoprefixer("last 5 versions"))
        //.pipe(minifyCSS(""))
        .pipe(rename("main.compiled.css"))
        .pipe(gulp.dest("app/css/dist/"))
        .pipe(connect.reload());
    ;
});

gulp.task('css_clear', function () {
    return gulp.src('app/css/*.css')
        .pipe(concatCSS("bandle.css"))
        .pipe(autoprefixer())
        .pipe(minifyCSS(""))
        .pipe(rename("main.min.css"))
        .pipe(gulp.dest("app/css/dist/"))
        .pipe(connect.reload());
    ;
});

gulp.task('bower', function () {
    gulp.src('./app/*.html')
        .pipe(wiredep({
            directory: "app/bower/"
        }))
        .pipe(gulp.dest('./app'));
});


gulp.task('watch', function() {
    gulp.watch('app/sass/*.scss', ['sass']);
    //gulp.watch('app/css/*.css', ['css']);
    gulp.watch('app/*.html', ['html']);
    gulp.watch('bower.json', ['bower']);
});

gulp.task('html', function() {
    gulp.src('app/*.html')
        .pipe(connect.reload());
});


gulp.task('minify-css', function() {
    return gulp.src('app/css/*.css')
        .pipe(minifyCSS({keepBreaks:true}))
        .pipe(gulp.dest('dist/'))
});


gulp.task('connect', function() {
    connect.server({
        root: 'app',
        livereload: true,
        port:8888
    });
   // opn('http://localhost:8888/')
});

/*
 gulp.task('sprites', function() {
 var spriteOutput;
 spriteOutput = gulp.src("./src/css/*.css")
 .pipe(sprite({
 baseUrl:         "./src/image",
 spriteSheetName: "sprite.png",
 spriteSheetPath: "/dist/image"
 });
 spriteOutput.css.pipe(gulp.dest("./dist/css"));
 spriteOutput.img.pipe(gulp.dest("./dist/image"));
 });
 */
