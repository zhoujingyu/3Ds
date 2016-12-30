const gulp=require('gulp'),
    sass=require('gulp-sass'),
    cssmin=require('gulp-clean-css'),
    prefixer=require('gulp-autoprefixer'),
    babel=require('gulp-babel');

gulp.task('watchSass',function(){
    gulp.watch('./public/src/sass/**',function(event){
        console.log('<------------------'+new Date().toLocaleString()+'------------------>');
        gulp.src('./public/src/sass/**')
            .pipe(sass().on('error',sass.logError))
            //.pipe(prefixer({
            //    cascade:true,
            //    remove:true
            //}))
            .pipe(cssmin({
                keepBreaks:true,
                keepSpecialComments: '*'
            }))
            .pipe(gulp.dest('./public/dist/css/'));
    })
});

gulp.task('watchBabel',function(){
    gulp.watch('./public/src/js/**',function(event){
        console.log('<------------------'+new Date().toLocaleString()+'------------------>');
        gulp.src('./public/src/js/**')
            .pipe(babel({
                presets:['react','es2015']
            }))
            .pipe(gulp.dest('./public/dist/js'))
    })
});