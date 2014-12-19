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

  var renderers = _.map(rows, getDefaultRenderer);

  // This is assuming a row render for each row. This doesn't make sense because
  // getRowRenderer is really going to figure out the renderer from the feature type (gene or clinical),
  // not from the row.
  oncoprint.withRows(rows).withRowRenderers(renderers);

  d3.select('#main').call(chart);

});
