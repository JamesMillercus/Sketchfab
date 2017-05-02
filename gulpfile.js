// Gulp dependencies
const gulp = require('gulp');

// Build dependencies
const babelify =  require('babelify');
const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

// Style dependencies
const concatCss = require('gulp-concat-css');
const sass = require('gulp-sass');

// Development dependencies
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');
const runSequence = require('run-sequence');

// Asset dependencies
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

//task execution
const exec = require('child_process').exec;


gulp.task('default', function(callback){
	runSequence(['db','sitestyles', 'sass', 'jslibs', 'es6', 'server', 'models', 'updates', 'routes', 'html', 'favico', 'procfile', 'images', 'fonts', 'browserSync', 'watch'], callback )
});

// gulp.task('build', function(callback){
// 	runSequence(['images', 'fonts', 'admin', 'procfile'], callback )
// })

gulp.task('watch', function(){
	gulp.watch('app/templates/**/*.pug', ['html']); //html
	gulp.watch('app/*.js', ['server']); // keystone settings
	gulp.watch('app/updates/*.js', ['updates']); // keystone admin
	gulp.watch('app/models/*.js', ['models']); // keystone models
	gulp.watch('app/routes/**/*.js', ['routes']); // keystone routes
	gulp.watch('app/public/js/custom/**/*.js', ['es6']); // front end js
	gulp.watch('app/public/js/libs/custom/*.js', ['jslibs']); // front end libs
	gulp.watch('app/public/customStyles/scss/**/*.scss', ['sass']); //sass
});

gulp.task('db', function(cb){
	  exec('mongod -f ./mongo/config/mongod.conf', function (err, stdout, stderr) {
	    console.log(stdout);
	    console.log(stderr);
	    cb(err);
	  });
})

//task to put all admin files into dist folder
gulp.task('favico', function(){
	return gulp.src('app/public/*.ico')
	.pipe(gulp.dest('dist/public'))
});

gulp.task('procfile', function(){
	return gulp.src('app/Procfile')
	.pipe(gulp.dest('dist/'))
});

//task to optimise images + put them in dist folder
gulp.task('images', function(){
	return gulp.src('app/public/images/**/*.+(png|jpg|gif|svg|mp4|ogv|ogg)')
	.pipe(cache(imagemin({
		interlaced: true
	})))
	.pipe(gulp.dest('dist/public/images/'))
});

gulp.task('fonts', function(){
	return gulp.src('app/public/fonts/**/*')
	.pipe(gulp.dest('dist/public/fonts/'))
});

gulp.task('server', function(){
	return gulp.src('app/*.js')
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.reload({
		stream: true
	})); //build folder
});

gulp.task('updates', function(){
	return gulp.src('app/updates/*.js')
	.pipe(gulp.dest('dist/updates/'))
	.pipe(browserSync.reload({
		stream: true
	})); //build folder
});

gulp.task('models', function(){
	return gulp.src('app/models/*.js')
	.pipe(gulp.dest('dist/models/'))
	.pipe(browserSync.reload({
		stream: true
	})); //build folder
});

gulp.task('routes', function(){
	return gulp.src('app/routes/**/*.js')
	.pipe(gulp.dest('dist/routes/'))
	.pipe(browserSync.reload({
		stream: true
	})); //build folder
});

gulp.task('es6', function() { //transform all code into es2015 format
	browserify('app/public/js/bundle.min.js') //take all code from index.js
	.transform('babelify', { //transform the code using the es2015 preset
		presets: ['es2015'],
	})
	.bundle() //return a stream of code
	.pipe(source('bundle.min.js')) //bundle into a new file name
	.pipe(buffer()) //put all new code into
	// .pipe(uglify()) //minifies code
	.pipe(gulp.dest('dist/public/js/'))
	.pipe(browserSync.reload({
		stream: true
	})) //build folder
});

// //jQuery
// gulp.task('jquery', function(){
// 	return gulp.src('app/public/js/jquery/*.js')
// 	// .pipe(uglify()) //minifies code
// 	.pipe(gulp.dest('dist/public/js/jquery/'));
// });

// //bootstrap
// gulp.task('bootstrap', function(){
// 	return gulp.src('app/public/js/bootstrap/*.js')
// 	// .pipe(uglify()) //minifies code
// 	.pipe(gulp.dest('dist/public/js/bootstrap/'));
// });

gulp.task('jslibs', function(){
	return gulp.src('app/public/js/libs/*.js')
	.pipe(concat('libs.min.js'))
	// .pipe(uglify()) //minifies code
	.pipe(gulp.dest('dist/public/js/libs/'));
});

//task to turn sass into css and then reload browser
gulp.task('sitestyles', function(){
	return gulp.src('app/public/styles/**/*.+(css|scss)')
    .pipe(gulp.dest('dist/public/styles'))
});

//task to turn sass into css and then reload browser
gulp.task('sass', function(){
	return gulp.src('app/public/customStyles/scss/**/*.scss')
	.pipe(sass())
	.pipe(concatCss('styles.min.css'))
    .pipe(gulp.dest('dist/public/customStyles/css/'))
    .pipe(browserSync.reload({
		stream: true
	}))
});

// our gulp-nodemon task
gulp.task('nodemon', function (cb) {
	var started = false;
	return nodemon({
		script: 'dist/keystone.js'
	}).on('start', function () {
		//avoid nodemon being started multiple times
		if (!started) {
			console.log("server started");
			cb();
			started = true;
			setTimeout(function reload(){
				browserSync.reload({
					stream: false
				});
			}, 4000)
		}else{
			console.log("server restarted")
			setTimeout(function reload(){
				browserSync.reload({
					stream: false
				});
			}, 2000)
		}
	})
	.on('crash', function() {
		console.log('nodemon.crash');
	})
	.on('restart', function() {
		console.log('nodemon.restart');
		// browserSync.reload();
	})
	.once('quit', function () {
		// handle ctrl+c without a big weep
		process.exit();
	});
});

gulp.task('browserSync', ['nodemon'], function() {
	browserSync.init(null, {
	    proxy: "http://127.0.0.1:3000",
		port: 4000
    })
	console.log("Browser sync is working");
});



gulp.task('html', function(){
	return gulp.src('app/templates/**/*.pug')
	.pipe(gulp.dest('dist/templates/'))
	.pipe(browserSync.reload({
		stream: true
	}));
});
