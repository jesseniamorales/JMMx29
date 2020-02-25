// eslint-disable prefer-const */
// eslint-disable no-var */
// eslint-disable no-console */

var dataset = [5, 10, 15, 20, 25];

var body = d3.select('body');

body.selectAll(p)
    .data(dataset)
    .enter()
    .append('p')
    .text(function(d) {
        return `I can count up to ${d}`;
    })
    .style('color', function(d) {
        if (d > 15) {
            // Threshold of 15
            return 'red';
        }
        return 'black';
    });