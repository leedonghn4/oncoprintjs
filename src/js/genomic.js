var d3 = require('d3');
var _ = require('underscore');
var renderers = require('./renderers');
var core = require('./core');
var utils = require('./utils');

var oncoprint_core = core();
var gene_renderer = renderers.gene();

// TODO this config is bleeding through both renderers
// and genomic because core needs to know some general
// information about row elements...
var config = { rect_height: 20,
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

var genomic = function(config) {
  var container = undefined;
  var row_height = 25;
  var width = 750;

  var fbar = function(div) {
    container = div;
  };

  fbar.addRow = function(row) {
    var rows = utils.extract_data(d3.select(container));
    rows.push(row);

    oncoprint_core.config({row_height: row_height});
    oncoprint_core.container_width(width);
    oncoprint_core.element_width(config.rect_width);
    oncoprint_core.element_padding(config.rect_padding);
    oncoprint_core.labels(utils.rows_to_labels(rows));
    oncoprint_core.rows(rows);
    container.call(oncoprint_core);

    return fbar;
  };

  // TODO s/rows/addRow
  fbar.rows = function(rows) {
    var data = utils.extract_data(d3.select(container));
    data = data.concat(rows);

    oncoprint_core.config({row_height: row_height});
    oncoprint_core.container_width(width);
    oncoprint_core.element_width(config.rect_width);
    oncoprint_core.element_padding(config.rect_padding);
    oncoprint_core.labels(utils.rows_to_labels(rows));
    oncoprint_core.rows(rows);
    container.call(oncoprint_core);

    return fbar;
  };

  if (arguments.length === 1) {
    return fbar;
  }
  else {
    return fbar(arguments[1]);
  }
};

// var genomic = function() {
//   var row_height = 25;
//   var width = 500;
//   var rows = [];

//   var me = function(container) {
//     oncoprint_core.config({row_height: row_height});
//     oncoprint_core.container_width(width);
//     oncoprint_core.element_width(config.rect_width);
//     oncoprint_core.element_padding(config.rect_padding);
//     oncoprint_core.labels(utils.rows_to_labels(rows));
//     oncoprint_core.rows(rows);
//     container.call(oncoprint_core);
//   };

//   me.rows = function(value) {
//     if (!arguments.length) return rows;

//     // push selection renderer for each row
//     value = _.map(value, function(row) {
//       return row.concat([gene_renderer]);
//     });

//     rows = value;
//     return me;
//   };

//   me.row_height = function(value) {
//     if (!arguments.length) return row_height;
//     row_height = value;
//     return me;
//   };

//   me.width = function(value) {
//     if (!arguments.length) return width;
//     width = value;
//     return me;
//   };

//   return me;
// };

module.exports = genomic;
