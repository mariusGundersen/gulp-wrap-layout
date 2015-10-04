# gulp-wrap-layout [![NPM version][npm-image]][npm-url]

> A [gulp](https://github.com/gulpjs/gulp) plugin to wrap the stream contents with an [ejs](https://www.npmjs.com/package/ejs) template.

## Usage

First, install `gulp-wrap-layout` as a development dependency:

```shell
npm install --save-dev gulp-wrap-layout
```

Then, add it to your `gulpfile.js`:

**Wrap the contents with an inline template:**

```javascript
var wrap = require("gulp-wrap-layout");

gulp.src("./src/*.json")
	.pipe(wrap('angular.module(\'text\', []).value(<%= contents %>);'))
	.pipe(gulp.dest("./dist"));
```

**Wrap the contents with a template from file:**

```javascript
var wrap = require("gulp-wrap-layout");

gulp.src("./src/*.json")
	.pipe(wrap({ src: 'path/to/template.txt'}))
	.pipe(gulp.dest("./dist"));
```

**Provide additional data and options for template processing:**

```javascript
var wrap = require("gulp-wrap-layout");

gulp.src("./src/*.json")
	.pipe(wrap('BEFORE <%= contents %> <%= data.someVar %> AFTER', { someVar: 'someVal'}, { variable: 'data' }))
	.pipe(gulp.dest("./dist"));
```

This gulp plugin wraps the stream contents in a template. If you want the stream contents to be the templates use the [gulp-template](https://github.com/sindresorhus/gulp-template) plugin.

## Template

The stream contents will be available in the template using the `contents` key. Properties from the vinyl file will be available in the template under the `file` object and are local to that stream. User supplied `data` values will always take precedence over namespace clashes with the file properties.

## API

### wrap(template\[,data\]\[,options\])

#### template
Type: `String` or `Object`

The template to used. When a `String` then it will be used as the template. When an `Object` then the template will be loaded from file.

#### template.src
Type: `String`

The file location of the template.

#### data
Type: `Object`

The data object that is passed on to the [ejs](https://www.npmjs.com/package/ejs#example) template call.

#### options
Type: `Object`

The options object that is passed on to the [ejs](https://www.npmjs.com/package/ejs#example) template call.

### wrap.ejs

Access the [ejs](https://www.npmjs.com/package/ejs) object directly

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-wrap-layout
[npm-image]: https://badge.fury.io/js/gulp-wrap-layout.png