const { series, parallel} = require('gulp')
const gulp = require('gulp')
const concat = require('gulp-concat')
const cssmin = require('gulp-cssmin')
const rename = require('gulp-rename')
const uglify = require('gulp-uglify')
const image = require('gulp-image')
const stripJs = require('gulp-strip-comments')
const stripCss = require('gulp-strip-css-comments')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

function tarefasCSS(cb) {

    return gulp.src([
            './node_modules/bootstrap/dist/css/bootstrap.css',
            './node_modules/@fortawesome/fontawesome-free/css/fontawesome.css',
            './agencia/owl/css/owl.css',
            './agencia/jquery-ui/jquery-ui.css',
            './src/css/style.css',
            './src/css/styles.css',
            './src/css/home.css',
            './src/css/slider-page.css'
         ])
        .pipe(stripCss()) 
        .pipe(concat('styles.css'))
        .pipe(cssmin())
        .pipe(rename({ suffix: '.min'})) // libs.min.css
        .pipe(gulp.dest('./dist/css'))
    cb()

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


function tarefasJS(callback){

    gulp.src([
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
   .pipe(babel({
        comments: false,
        presets: ['@babel/env']
    }))
    .pipe(concat('scripts.js'))         // mescla arquivos
    .pipe(uglify())                     // minifica js
    .pipe(rename({ suffix: '.min'}))    // scripts.min.js
    .pipe(gulp.dest('./dist/js'))       // cria arquivo em novo diretório

    return callback()
}


function tarefasHTML(callback){

    gulp.src('./src/**/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('./dist'))

    return callback()
}


gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: "./dist"
        }
    })
    gulp.watch('./src/**/*').on('change', process) // repete o processo quando alterar algo em src
    gulp.watch('./src/**/*').on('change', reload)

})

function end(cb){
    console.log("tarefas concluídas")
    return cb()
}

const process = parallel( tarefasHTML, tarefasJS, tarefasCSS, end)

exports.styles = tarefasCSS
exports.scripts = tarefasJS
exports.images = tarefasImagem

exports.default = process