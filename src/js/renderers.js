var utils = require('./utils');

var gene_defaults = { rect_height: 20,
                     rect_padding: 3,
                     rect_width: 10,
                     mutation_fill: 'green',

                     cna_fills: {
                       null: 'grey',
                       undefined: 'grey',
                       AMPLIFIED: 'red',
                       HOMODELETED: 'blue'
                     }
                    };

var gene = function(config) {
  var settings = utils.deep_clone(gene_defaults);
  if (arguments.length === 1) {
    settings = _.extend(settings, config);
  }

  if (arguments.length > 1) {
    throw "Wrong number of arguments";
  }

  return function(selection) {
    var row_elements = selection.selectAll('g').data(function(d) { return d; })
    .enter().append('g');

    row_elements.attr('transform', function(d, i) {
      return utils.translate(i * (settings.rect_width + settings.rect_padding), 0);
    });

    row_elements.append('rect')
    .attr('fill', function(d) { return settings.cna_fills[d.cna]; })
    .attr('height', settings.rect_height)
    .attr('width', settings.rect_width);

    var one_third_height = settings.rect_height / 3;

    var mutation = row_elements.append('rect')
    .attr('y', one_third_height)
    .attr('fill', function(d) {
      // leave the ones without mutations uncolored
      return d.mutation !== undefined ? settings.mutation_fill : 'none';
    })
    .attr('height', one_third_height)
    .attr('width', settings.rect_width);

    // remove the ones without mutations
    mutation.filter(function(d) {
      return d.mutation === undefined;
    }).remove();
  };
};

exports.gene = gene;

//function(selection) {
//  var row_elements = selection.selectAll('g').data(function(d) { return d; })
//  .enter().append('g');
//
//  row_elements.attr('transform', function(d, i) {
//    return utils.translate(horizontal_scale(i), 0);
//  });
//
//  row_elements.append('rect')
//  .attr('fill', function(d) { return config.cna_fills[d.cna]; })
//  .attr('height', config.rect_height)
//  .attr('width', config.rect_width);
//};
