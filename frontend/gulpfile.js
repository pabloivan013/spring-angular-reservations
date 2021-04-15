var gulp = require('gulp')
var rimraf = require('rimraf')
var fs = require('fs')
var cheerio = require('cheerio')

const CLIENT_FOLDER = 'frontend'

const FRONTEND_PATH = `./dist/${CLIENT_FOLDER}`
const BACKEND_PATH = './../backend/src/main/resources/static'

gulp.task('dist', function(done) {
   
    // Remove frontend folder from backend
    rimraf.sync(`${BACKEND_PATH}/*`) 
    
    //Copy dist folder
    gulp.src([`${FRONTEND_PATH}/**/*`]).pipe(
        gulp.dest(`${BACKEND_PATH}/`))

    done()
})