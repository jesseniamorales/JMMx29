var dimensions = {
    width: window.innerWidth * 0.9,
    height: 600,
    margin: {
            top: 20,
            right: 20,
            bottom: 30,
            left: 80,
    },
};

dimensions.boundedWidth = dimensions.width - dimensions.margin.left - dimensions.margin.right;
dimensions.boundedHeight = dimensions.height - dimensions.margin.top - dimensions.margin.bottom;

var svg = d3.select("figure#chart")
.append("svg")
// .attr("width", dimensions.width)
// .attr("height", dimensions.height)
.attr("viewBox", `0 0 ${dimensions.width} ${dimensions.height}`)
.append ("g")
.attr("transform", `translate(${dimensions.margin.left},${dimensions.margin.top})`);


// Think of this scales as a funcion: F(x) = something.
var xScale = d3.scaleLinear()
.range([0, dimensions.boundedWidth])

var yScale = d3.scaleBand()
.range([0, dimensions.boundedHeight])
.padding(0.3);

var rowConverter = function (d) {
    return {
        genre: d.genre,
        votes: +d.count
    }
};

// var rowConverter2 = (d) = > {
//     return {
//         genre: d.genre,
//         count: +d.count
//     }
// }

// loading data in d3v4
// d3.csv("https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv", rowConverter, function(data) {}
// do stuff with data
// })

// loading data in d3v5
d3.csv("https://raw.githubusercontent.com/lennymartinez/jmmx29/master/_work/examples/bar/data.csv", rowConverter)
.then(
    // our chart goes here!
    function(data) {
        console.log(data)

        // we can update the domain of the xScale with d3.extent
        // xScale.domain(d3.extent(data, function(d) {return d.votes}));
        xScale.domain([0, d3.max(data, d => d.votes)])

        yScale.domain(data.map(d=> d.genre));

        var xAxis = svg.append("g")
            .attr("class", "x axis")
            .call(d3.axisBottom(xScale))
            .attr('transform', `translate(0,${dimensions.boundedHeight})`)
            .selectAll("text")
            .attr("class", "axis_text")
            .style("text-anchor", "center");

            var candy = svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cy", d => yScale(d.genre))
            .attr("cx", d => xScale(d.votes))
            .attr("r", 10)
            .attr("fill", "teal")
        
            var y_axis = svg.append("g")
			.attr("class", "y axis")
			.call(d3.axisLeft(yScale))
			.selectAll("text")
			.attr("class", "axis_text")
			.style("text-anchor", "center");

    }
);