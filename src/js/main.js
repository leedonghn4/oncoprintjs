var _ = require("underscore");

var Oncoprint = require('./genomic');

d3.json("tp53-mdm2-mdm4-gbm.json", function(data) {
  var oncoprint = Oncoprint();

  // break into rows
  rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

  oncoprint.width(500);
  oncoprint.row_height(25);
  oncoprint.rows(rows);

  d3.select('#main').call(oncoprint);
});
