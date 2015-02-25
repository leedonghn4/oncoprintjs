var _ = require("underscore");

var genomic_oncoprint = require('../../src/js/genomic');

// TODO this is dirty.
window.test_for_genomic_data = function(filename, div_selector_string) {
  return d3.json(filename, function(data) {
    var oncoprint = genomic_oncoprint({}, d3.select(div_selector_string));

    // break into rows
    var rows = _.chain(data).groupBy(function(d) { return d.gene; }).values().value();

    oncoprint.rows(rows);
    oncoprint();
  });
};
