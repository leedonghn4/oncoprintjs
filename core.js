// TODO wait for gulp.
//var _ = require('underscore');
//var d3 = require('d3');
//var data = require('./tp53-mdm2-mdm4-gbm.json');

var Oncoprint = function() {

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


d3.json('tp53-mdm2-mdm4-gbm.json', function(data)  {
  var oncoprint = Oncoprint();

  rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

  // a renderer is a function which takes data and returns a function
  // that takes an enter selection and decides what to do with it.
  // If it does not know how to do, then it must return `undefined`.
  oncoprint.withRows(rows).withRenderMaker(function(d) {
    if (d.datatype === 'genomic') {
      return function(enter_selectoin) { };
    }

    if (d.datatype === 'clinical') {
      return function(d) { };
    }

    return undefined;
  });

  d3.select('#main').call(chart);
});
