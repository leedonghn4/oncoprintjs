// TODO, just dump all this stuff into a closure and export a single thing.
var _ = require('underscore');
var d3 = require('d3');

var compute_svg_width = function(rect_width, rect_padding, row_length) {
  return (rect_width + rect_padding) * row_length;
};

// This is a hack, use with caution.
var deep_clone = function(object) {
  return JSON.parse(JSON.stringify(object));
};

// d3 selection -> [ list of rows ]
var extract_data = function(container_selection) {
  var ret = container_selection.selectAll('.row').data()
  return ret || [];
};

var is_sample_genetically_altered = function(datum) {
  return datum.cna !== undefined
    || datum.mutation !== undefined
    || datum.rna !== undefined
    || datum.protein !== undefined;
};

var row_to_labels = function(row) {
  var percent_altered = _.filter(row, is_sample_genetically_altered).length / row.length;
  percent_altered = Math.round(percent_altered*100);
  return [{align: 'left', text: row[0].gene}, {align: 'right', text: percent_altered + "%"}];
};

var rows_to_labels = function(rows) {
  return _.flatten(_.map(rows, row_to_labels));
};

var translate = function(x,y) {
  return "translate(" + x + "," + y + ")";
};

exports.compute_svg_width = compute_svg_width;
exports.deep_clone = deep_clone;
exports.extract_data = extract_data;
exports.is_sample_genetically_altered = is_sample_genetically_altered;
exports.row_to_labels = row_to_labels;
exports.rows_to_labels = rows_to_labels;
exports.translate = translate;
