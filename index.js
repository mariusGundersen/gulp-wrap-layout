'use strict';

var es = require('event-stream');
var gutil = require('gulp-util');
var ejs = require('ejs');
var fs = require('fs');
var extend = require('node.extend');
var find = require('find-parent-dir');
var path = require('path');
var PluginError = gutil.PluginError;

var PLUGIN_NAME = 'gulp-wrap-layout';

function compile(file, contents, template, data){
  data = data !== undefined ? data : {};
  /*
   * Add `file` field to source obj used when interpolating
   * the template. Ensure the user supplied data object is not
   * augmented to prevent file prop leakage across multiple
   * streams. Properties specified in the user supplied data
   * object should take precedence over properties supplied
   * by the file.
   */
  data = extend(true, {}, { file: file, contents: contents, data:data});
  return ejs.render(template, data);
}


function readFile(src, templateName){
  var pathName = path.dirname(src);
  var template = find.sync(pathName, templateName);
  if(template == null){
    throw new PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Could not find template `' + templateName + '` in `' + pathName + '` or any of its parent directories');
  }
  template = template + '/' + templateName;
  return fs.readFileSync(template, 'utf-8');
}

module.exports = function(opts, data){
  if (!opts) {
    throw new PluginError(PLUGIN_NAME, PLUGIN_NAME + ': Missing template parameter');
  }

  var template;

  function wrap(file, callback){
    
    if (typeof(opts) === 'object') {
      template = readFile(file.path, opts.src);
    } else {
      template = opts;
    }
      
    if (gutil.isStream(file.contents)) {
      var through = es.through();
      var wait = es.wait(function(err, contents){
        through.write(compile(file, contents, template, data));
        through.end();
      });

      file.contents.pipe(wait);
      file.contents = through;
    }

    if (gutil.isBuffer(file.contents)) {
      file.contents = new Buffer(compile(file, file.contents.toString('utf-8'), template, data));
    }

    callback(null, file);
  }

  return es.map(wrap);
};

module.exports.ejs = ejs;