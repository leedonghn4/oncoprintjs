var d3 = require('d3');
var _ = require('underscore');

var renderers = require('./renderers');
var Oncoprint = require('./core');
var utils = require('./utils');

function compute_svg_width(rect_width, rect_padding, row_length) {
  return (rect_width + rect_padding) * row_length;
}

var oncoprint = Oncoprint();

// break into rows
rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

// default configuration for the gene renderer.
var config = {
  rect_height: 20,
  rect_padding: 3,
  rect_width: 10,

  cna_fills: {
    null: 'grey',
    undefined: 'grey',
    AMPLIFIED: 'red',
    HOMODELETED: 'blue'
  }
};

var gene_renderer = renderers.gene(config);

// push selection renderer for each row
_.each(rows, function(row) {
  row.push(gene_renderer);
});

var genomic = function() {
  var row_height = 25;
  var width = 500;
  var rows = [];

  var me = function() {
    oncoprint.container_width(width);
    oncoprint.svg_width(compute_svg_width(config.rect_width, config.rect_padding, rows[0].length));
    oncoprint.config({row_height: row_height});
    oncoprint.rows(rows);
    d3.select('#main').call(oncoprint);
  };

  me.rows = function(value) {
    if (!arguments.length) return rows;
    rows = value;
    return me;
  };

  me.row_height = function(value) {
    if (!arguments.length) return row_height;
    row_height = value;
    return me;
  };

  me.width = function(value) {
    if (!arguments.length) return width;
    width = value;
    return me;
  };

  return me;
};
