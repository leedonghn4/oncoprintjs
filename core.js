// TODO wait for gulp.
//var _ = require('underscore');
//var d3 = require('d3');
//var data = require('./tp53-mdm2-mdm4-gbm.json');

var oncoprint = function() {

  // defaults
  var foo = 42;

  var closure = function() {
  };

  // this is ridiculous, look into sweet.js
  closure.foo = function(value) {
    if (!arguments.length) return foo;
    foo = value;
    return closure;
  }


  return closure;
};
