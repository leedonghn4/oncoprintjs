// TODO wait for gulp.
//var _ = require('underscore');
//var d3 = require('d3');
//var data = require('./tp53-mdm2-mdm4-gbm.json');

var Oncoprint = function() {
  var rows;

  var me = function(container) {

    var svg = container.append('svg');

    // note that this is removing the renderer from each row.
    var renderers = _.map(rows, function(row) { return row.pop(); });

    var row_groups = svg.selectAll('g').data(rows)
      .enter().append('g');

    var row_elements = row_groups.selectAll('g').data(function(d) { return d; })
      .enter().append('g');

    row_elements.attr('x', function(d, i) { return i; });

    row_elements.append('rect')
        .attr('fill', function(d) { console.log(d); return 'black'; });

   // row_groups.each(function(row, i) {
   //   renderers[i](row);
   // });
   //
  };

  me.rows = function(value) {
    if (!arguments.length) return rows;
    rows = value;
    return me;
  }

  return me;
};


d3.json('tp53-mdm2-mdm4-gbm.json', function(data)  {
  var oncoprint = Oncoprint();

  // break into rows
  rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

  // push selection renderer for each row
  _.each(rows, function(row) {
    row.push(function(selection) {
      return selection;
    });
  });

  oncoprint.rows(rows);

  d3.select('#main').call(oncoprint);
});
