var utils = require('./utils');

var gene = function(config) {
  return function(selection) {
    var row_elements = selection.selectAll('g').data(function(d) { return d; })
    .enter().append('g');

    row_elements.attr('transform', function(d, i) {
      return utils.translate(i * (config.rect_width + config.rect_padding), 0);
    });

    row_elements.append('rect')
    .attr('fill', function(d) { return config.cna_fills[d.cna]; })
    .attr('height', config.rect_height)
    .attr('width', config.rect_width);
  };
};

exports.gene = gene;
