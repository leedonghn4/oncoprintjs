//
// Main Block.
//

d3.json("tp53-mdm2-mdm4-gbm.json", function(data) {
  var oncoprint = Oncoprint();

  // break into rows
  rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

  // push selection renderer for each row
  _.each(rows, function(row) {
    row.push(renderers.gene);
  });

  var row_height = 25;

  oncoprint.container_width(500);
  oncoprint.svg_width(compute_svg_width(config.rect_width, config.rect_padding, rows[0].length));
  oncoprint.config({row_height: row_height});
  oncoprint.rows(rows);

  d3.select('#main').call(oncoprint);
});
