// TODO wait for gulp.
//var _ = require('underscore');
//var d3 = require('d3');
//var data = require('./tp53-mdm2-mdm4-gbm.json');

var Oncoprint = function() {
  // defaults
  var rows;
  var renderMaker;

  var me = function(container) {
    // the container itself is going to be a container of containers
    // leaving the decision of what type of <svg> element to use up
    // to the user.
    container
      .selectAll('div')
      .enter
  };

  me.rows = function(value) {
    if (!arguments.length) return rows;
    rows = value;
    return me;
  }

  me.renderMaker = function(value) {
    if (!arguments.length) return renderMaker;
    renderMaker = value;
    return me;
  }

  return me;
};


d3.json('tp53-mdm2-mdm4-gbm.json', function(data)  {
  var oncoprint = Oncoprint();

  rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

  // a renderer is a function which takes data and returns a function
  // that takes an enter selection and decides what to do with it.
  // If it does not know how to do, then it must return `undefined`.
  oncoprint.rows(rows).renderMaker(function(d) {
    if (d.datatype === 'genomic') {
      return function(enter_selectoin) { };
    }

    if (d.datatype === 'clinical') {
      return function(d) { };
    }

    return undefined;
  });

  d3.select('#main').call(oncoprint);
});
