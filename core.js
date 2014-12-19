var _ = require('underscore');
var data = require('./tp53-mdm2-mdm4-gbm.json');
data[0]

_.groupBy(data, function(d) { return d.gene; })

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
