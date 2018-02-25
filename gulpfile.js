let gulp = require('gulp');
let plumber = require('gulp-plumber');
let eslint = require('gulp-eslint');
let browserify = require('browserify');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let source = require('vinyl-source-stream');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let rename = require('gulp-rename');
let htmlmin = require('gulp-htmlmin');
let imagemin = require('gulp-imagemin');
let cssmin = require('gulp-cssmin');
let sequence = require('gulp-sequence');
let fs = require('fs');

let express = require('express');
let app = express();
let http = require('http');
let open = require('open');

let livereload = require('gulp-livereload');

app.use(express.static(`${__dirname}/docs`));

let getSymverFromPackage = () => {
	let pkg = require('./package.json');

	return pkg.version;
};

let writeSymverToPackage = (symverStr) => {
	let pkg = require('./package.json');
	pkg.version = symverStr;

	fs.writeFileSync('./package.json', JSON.stringify(pkg, 0, 4));
};

let createGitTag = (symver) => {
	exec(`git commit -am "Updated version to ${symver}"`, {cwd: __dirname}, (err, stdout, stderr) => {
		if(err)
			throw new Error(err);
		else {
			exec(`git tag v${symver}`, {cwd: __dirname}, (err, stdout, stderr) => {
				if(err)
					throw new Error(err);
			});
		}
	});
};

let bumpVersion = (index) => {
	let originalSymver = getSymverFromPackage();
	let versions = originalSymver.split('.');

	versions[index]++;

	versions.forEach((version, i) => {
		if(i > index)
			versions[i] = 0;
	});

	let newSymver = `${versions[0]}.${versions[1]}.${versions[2]}`;
	writeSymverToPackage(newSymver);
	
	setTimeout(() => {
		createGitTag(newSymver);
	}, 7000);
};

gulp.task('bump-major', () => {
	bumpVersion(0);
});

gulp.task('bump-minor', () => {
	bumpVersion(1);
});

gulp.task('bump-patch', () => {
	bumpVersion(2);
});

gulp.task('lint-scripts', () => {
	return gulp.src(['src/js/**/*.js'])
	.pipe(eslint())
	.pipe(eslint.format());
});

gulp.task('compile-scripts', ['lint-scripts'], () => {
	return browserify('src/js/game.js', {
		paths: [
			'./node_modules', './src/js',
		],
	})
	.transform('babelify', {
		presets: ['env'],
	})
	.bundle()
	.on('error', function(err) {
		console.error(err);
		this.emit('end');
	})
	.pipe(source('game.js'))
	.pipe(plumber())
    .pipe(gulp.dest('docs/js'));
});

gulp.task('min-scripts', ['compile-scripts'], () => {
	return gulp.src(['docs/js/game.js'])
	.pipe(plumber())
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('docs/js'))
    .pipe(livereload());
});

gulp.task('min-html', () => {
	return gulp.src('src/**/*.html')
	.pipe(plumber())
	.pipe(htmlmin({
		collapseWhitespace: true,
		minifyURLs: true,
		minifyCSS: true,
		minifyJS: true,
		removeAttributeQuotes: true,
		removeComments: true,
		removeEmptyAttributes: true,
		removeOptionalTags: true,
		removeRedundantAttributes: true,
	}))
	.pipe(gulp.dest('docs'))
	.pipe(livereload());
});

gulp.task('sass', () => {
	return gulp.src(['src/scss/**/*.scss', 'src/scss/**/*.css', 'src/css/**/*.css', 'src/js/**/*.scss', 'src/js/**/*.css'])
	.pipe(plumber())
	.pipe(sass.sync())
	.pipe(autoprefixer({
		browsers: ['last 3 versions'],
	}))
	.pipe(concat('game.css'))
	.pipe(cssmin())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('docs/css'))
	.pipe(livereload());
});

gulp.task('fonts', () => {
	const fontDir = 'src/fonts/';
	return gulp.src([fontDir + '*.ttf',
		fontDir + '*.oft',
		fontDir + '*.woff',
		fontDir + '*.woff2',
		fontDir + '*.svg',
		fontDir + '*.eot'])
	.pipe(plumber())
	.pipe(gulp.dest('docs/fonts'))
	.pipe(livereload());
});

gulp.task('min-image', () => {
	return gulp.src('src/img/**/*')
	.pipe(plumber())
	.pipe(imagemin())
	.pipe(gulp.dest('docs/img'))
	.pipe(livereload());
});

gulp.task('serve', () => {
	let server = http.createServer(app);
	let serverPort = 3000;

	server.listen(serverPort, () => {
		let url = `http://localhost:${serverPort}`;
		console.log(`Now serving the page at ${url}`);
		open(url);
	});

	process.on('SIGINT', function() {
		server.close();
		process.exit();
	});
});

gulp.task('prod', () => {
	process.env.NODE_ENV = 'production';
});

gulp.task('build-all', (callback) => {
	sequence('prod', ['min-scripts', 'min-html', 'sass', 'fonts'])(callback);
});

gulp.task('watch-scripts', () => {
	gulp.watch('src/js/**/*.js', ['min-scripts']);
});

gulp.task('watch-html', () => {
	gulp.watch('src/**/*.html', ['min-html']);
});

gulp.task('watch-sass', () => {
	gulp.watch(['src/scss/**/*.scss', 'src/scss/**/*.css', 'src/css/**/*.css', 'src/js/**/*.scss', 'src/js/**/*.css'], ['sass']);
});

gulp.task('watch-fonts', () => {
	gulp.watch(['src/fonts/**'], ['fonts']);
});

gulp.task('watch-img', () => {
	gulp.watch(['src/img/**'], ['min-image']);
});

gulp.task('livereload', () => {
	livereload.listen({
		start: true,
		reloadPage: 'docs/index.html',
	});
});

gulp.task('default', sequence('build-all', ['watch-scripts', 'watch-html', 'watch-sass', 'watch-fonts', 'watch-img', 'serve', 'livereload']));
