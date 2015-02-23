var d3 = require('d3');
var _ = require('underscore');
var renderers = require('./renderers');
var core = require('./core');
var utils = require('./utils');

var oncoprint_core = core();
var gene_renderer = renderers.gene();

var foobar = function(config) {
  var container = undefined;

  var fbar = function(div) {
    container = div;
  };

  fbar.addRow = function(row) {
    var data = core.extract_data(d3.select(container));
    data.push(row);

    // ...
  };

  fbar.addRows = function(rows) {
    var data = core.extract_data(d3.select(container));
    data.concat(rows);
  };

  if (arguments.length === 1) {
    return fbar;
  }
  else {
    return fbar(arguments[1]);
  }
};

var genomic = function() {
  var row_height = 25;
  var width = 500;
  var rows = [];

  var me = function(container) {
    oncoprint_core.config({row_height: row_height});
    oncoprint_core.container_width(width);
    oncoprint_core.element_width(config.rect_width);
    oncoprint_core.element_padding(config.rect_padding);
    oncoprint_core.labels(utils.rows_to_labels(rows));
    oncoprint_core.rows(rows);
    container.call(oncoprint_core);
  };

  me.rows = function(value) {
    if (!arguments.length) return rows;

    // push selection renderer for each row
    value = _.map(value, function(row) {
      return row.concat([gene_renderer]);
    });

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

module.exports = genomic;
