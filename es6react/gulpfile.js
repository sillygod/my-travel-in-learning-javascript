

var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var babelify = require('babelify');
var reactfy = require('reactify');


var dependencies = [
  'react',
  'react/addons',
];

var scriptsCount = 0;

gulp.task('scripts', function(){
  bundleApp(false);
});

gulp.task('deploy', function(){
  bundleApp(true);
});

gulp.task('default', function(){
  gulp.watch(['./**/*.js', '!./web/*.js'], ['scripts']);
});

function bundleApp(isProduction){

  scriptsCount++;

  var appBundler = browserify({
    entries: 'app.js',
    debug: true
  });

  if(!isProduction && scriptsCount === 1){
    browserify({
      require: dependencies,
      debug: true
    })
    .bundle()
    .on('error', gutil.log)
    .pipe(source('vendors.js'))
    .pipe(gulp.dest('./web/js/'));
  }

  if(!isProduction){
    dependencies.forEach(function(dep){
      appBundler.external(dep);
    })

  }

  appBundler
    .transform(babelify)
    .bundle()
    .on('error', gutil.log)
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./web/js'));
}


