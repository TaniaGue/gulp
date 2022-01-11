const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
// const image = require('gulp-image')

function tarefasCSS(cb) {

    return gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './agencia/owl/css/owl.css',
            './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
            './agencia/jquery-ui/jquery-ui.css',
            './src/css/style.css',
            './src/css/styles.css',
            './src/css/home.css',
            './src/css/slider-page.css'
         ])
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min'})) // libs.min.css
        .pipe(gulp.dest('./dist/css'))

}

function tarefasJS(){

    return gulp.src([
        './node_modules/jquery/dist/jquery.js',
        './node_modules/bootstrap/dist/js/bootstrap.js',
        './agencia/owl/js/owl.js',
        './agencia/jquery-mask/jquery.mask.js',
        './agencia/jquery-ui/jquery-ui.js',
        './src/libs/font-awesome/font-awesome.min.js',
        './src/js/custom.js',
        './src/js/mockup.js',
        './src/js/main.js'
    ])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min'})) //libs.min.js
        .pipe(gulp.dest('./dist/js'))
}


function tarefasImagem(){
    
    return gulp.src('./src/images/*')
        .pipe(image({
            pngquant: true,
            optipng: false,
            zopflipng: true,
            jpegRecompress: false,
            mozjpeg: true,
            gifsicle: true,
            svgo: true,
            concurrent: 10,
            quiet: true
        }))
        .pipe(gulp.dest('./dist/images'))
}

exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem