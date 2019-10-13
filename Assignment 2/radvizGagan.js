/* Function to rest CheckBoxes */
function toggle(source) {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i] != source)
            checkboxes[i].checked = source.checked;
    }
}


/* Creating a custom Color Map */
colorMap = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
    "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf",
    "#1f77b4", "#aec7e8", "#ff7f0e", "#ffbb78", "#2ca02c",
    "#98df8a", "#d62728", "#ff9896", "#9467bd", "#c5b0d5",
    "#8c564b", "#c49c94", "#e377c2", "#f7b6d2", "#7f7f7f",
    "#c7c7c7", "#bcbd22", "#dbdb8d", "#17becf", "#9edae5"]

/* Clear all variables when 
Reset button is pushed. */
function cleanAll() {
    textFromFileLoaded = "";
    titles = "";
    targetAttribute = "";
    inputAttributes = "";
    colorScheme = null;
    csvData = "";
    selectedColumns = "";
    selectedColumnsName = [];
}
/* 
Code Referred from:  
https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.23.1/babel.min.js, 
https://github.com/WYanChao/RadViz  
*/
function plotRadViz() {

    var
        DOMRadViz,
        titles,
        colorScheme,
        Dimensionality,
        dataAnchornchor,
        nodecolor,
        radiusdataAnchor,
        radiusdataTable,
        margin,
        dataAnchor,
        normalisedDimensions,
        attributesData,
        RadVizRadius, svg,
        dataAnchorTA;

    function RadViz(div) {

        initiallizeGrid();
        var dimensions = normalizeCSVdata(Dimensionality);
        attributesData = findTargetCoordinates(attributesData, normalisedDimensions, dataAnchor);
        legendPositioning();

        var dataAnchordata = dimensions.map(function (d, i) {
            return {
                theta: dataAnchor[i],
                x: Math.cos(dataAnchor[i]) * RadVizRadius + RadVizRadius,
                y: Math.sin(dataAnchor[i]) * RadVizRadius + RadVizRadius,
                fixed: true,
                name: d
            };
        });


        /* Define colors for target attribute */
        var colorspace = [],
            colorclass = [];

        attributesData.forEach(function (d) {
            if (colorspace.indexOf(d.color) < 0) {
                colorspace.push(d.color);
                colorclass.push(d[targetAttribute]);
            }
        });

        var center = svg.append('g').attr('class', 'center').attr('transform', `translate(${margin.left},${margin.top})`);

        svg.append('rect')
            .attr('class', 'dataAnchortip-rect');

        var dataAnchortipContainer = svg.append('g')
            .attr('x', 0)
            .attr('y', 0);

        var dataAnchortip = dataAnchortipContainer.append('g')
            .attr('class', 'dataAnchortip')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .attr('display', 'none');

        dataAnchortip.append('rect');

        dataAnchortip.append('text')
            .attr('width', 150)
            .attr('height', 25)
            .attr('x', 0)
            .attr('y', 25)
            .text(':')
            .attr('text-anchor', 'start')
            .attr('dominat-baseline', 'middle');

        svg.append('rect')
            .attr('class', 'tip-rect')
            .attr('width', 80)
            .attr('height', 200)
            .attr('fill', 'transparent')
            .attr('backgroundColor', d3.rgb(100, 100, 100));

        var tooltipContainer = svg.append('g')
            .attr('class', 'tip')
            .attr('transform', `translate(${margin.left},${margin.top})`)
            .attr('display', 'none');

        /* Adding data points to RadViz plot */
        const RadVizRadviz = d3.select(DOMRadViz)
            .data([RadVizradviz()]);

        RadVizRadviz.each(render);

        function render(method) {
            d3.select(this).call(method);
        }
        /* Finding the Co-ordinates of DataAnchor based on their position
        Code Referred from:  
        https://github.com/WYanChao/RadViz  
        */
        function findTargetCoordinates(attributesData, normalisedDimensions, dataAnchor) {
            attributesData.forEach(function (d) {
                var dsum = d.dsum, dx = 0, dy = 0;
                normalisedDimensions.forEach(function (k, i) {
                    dx += Math.cos(dataAnchor[i]) * d[k];
                    dy += Math.sin(dataAnchor[i]) * d[k];
                });
                d.x0 = dx / dsum;
                d.y0 = dy / dsum;
                d.dist = Math.sqrt(Math.pow(dx / dsum, 2)
                    + Math.pow(dy / dsum, 2));
                d.distH = Math.sqrt(Math.pow(dx / dsum, 2)
                    + Math.pow(dy / dsum, 2));
                d.theta = Math.atan2(dy / dsum,
                    dx / dsum) * 180 / Math.PI;
            });
            return attributesData;
        }

        /* Changing the opacity of the data nodes. 
        Referred from: https://bl.ocks.org/EfratVil/2bcc4bf35e28ae789de238926ee1ef05 */
        d3.select("#opacity").on("input", function () {
            var tempa = d3.select(DOMRadViz).selectAll('.circle-data');
            tempa.nodes().forEach((element) => {
                var tempb = element.getAttribute('id');

                d3.select(element).attr('fill-opacity', (document.getElementById('opacity').value) / 100)
                    .attr('stroke-width', (document.getElementById('opacity').value) / 1000);

            });
        });
        
        /* Code Referred from:  
        https://github.com/WYanChao/RadViz */
        function RadVizradviz() {
            function chart(div) {
                div.each(function () {

                    /* Draw the big Circle here */
                    drawPanel(RadVizRadius);
                    /* Draw the Anchors on top of Big Circle */
                    drawdataAnchor();
                    /* Add Label to these Anchors */
                    drawdataAnchorLabel();

                    /* Tooltip Calculations */
                    var tooltip = tooltipContainer.selectAll('text')
                        .data(titles)
                        .enter()
                        .append('g')
                        .attr('x', 0)
                        .attr('y', function (d, i) {
                            return 25 * i;
                        });

                    tooltip.append('rect')
                        .attr('opacity', 0.7)
                        .attr('width', 180)
                        .attr('height', 25)
                        .attr('x', 0 - 5).attr('y', function (d, i) {
                            return 25 * i;
                        })
                        .attr("rx", 1)
                        .attr("ry", 1)
                        .attr('fill', d3.rgb(153, 204, 255));

                    tooltip.append('text')
                        .attr('width', 150)
                        .attr('height', 25)
                        .attr('x', 5)
                        .attr('y', function (d, i) { return 25 * (i + 0.7); })
                        .text(d => d + ':').attr('text-anchor', 'start').attr('dominat-baseline', 'hanging');

                    /* plot the data points */
                    drawdataTable();
                    /* Draw Legend */
                    drawLegend();

                    /* function to draw circles */
                    function drawPanel(radii) {
                        var panel = center.append('circle')
                            .attr('class', 'big-circle')
                            .attr('stroke', d3.rgb(100, 0, 0))
                            .attr('stroke-width', 2)
                            .attr('fill', 'transparent')
                            .attr('r', radii)
                            .attr('cx', radii)
                            .attr('cy', radii);
                    }

                    /* Function to add labels to Anchors */
                    function drawdataAnchorLabel() {
                        center.selectAll('text.dataAnchor-label').remove();
                        var dataAnchorNodesLabel = center.selectAll('text.dataAnchor-label')
                            .data(dataAnchordata).enter().append('text').attr('class', 'dataAnchor-label')
                            .attr('x', d => d.x).attr('y', d => d.y)
                            .attr('text-anchor', d => Math.cos(d.theta) > 0 ? 'start' : 'end')
                            .attr('dominat-baseline', d => Math.sin(d.theta) < 0 ? 'baseline' : 'hanging')
                            .attr('dx', d => Math.cos(d.theta) * 15)
                            .attr('dy', d => Math.sin(d.theta) < 0 ? Math.sin(d.theta) * (15) : Math.sin(d.theta) * (15) + 10)
                            .text(d => d.name)
                            .attr('font-size', '13pt')
                            .attr('font-family', 'Cabin');
                    }

                    /* Function to draw Anchors */
                    function drawdataAnchor() {
                        center.selectAll('circle.dataAnchor-node').remove();
                        var dataAnchorNodes = center.selectAll('circle.dataAnchor-node')
                            .data(dataAnchordata)
                            .enter()
                            .append('circle').attr('class', 'dataAnchor-node')
                            .attr('stroke-width', 1)
                            .attr('r', radiusdataAnchor)
                            .attr('cx', dist => dist.x)
                            .attr('fill', d3.rgb(100, 0, 120))
                            .attr('stroke', d3.rgb(255, 255, 255))
                            .attr('cy', dist => dist.y)
                            .on('mouseenter', function (d) {
                                var damouse = d3.mouse(this);
                            })
                            .on('mouseout', function (d) {
                                svg.select('g.dataAnchortip').attr('display', 'none');
                            })
                            .call(d3.drag()
                                .on('start', startDragging)
                                .on('drag', dragging)
                                .on('end', stoppedDragging)
                            );
                    }

                    /* functions to implement dragging of
                    anchors along the circumfrance of
                    big circle */
                    function startDragging(d) {
                        d3.select(this).raise().classed('active', true);
                    }

                    function stoppedDragging(d) {
                        d3.select(this).classed('active', false);
                        d3.select(this).attr('stroke-width', 0);
                    }

                    function dragging(d, i) {
                        d3.select(this).raise().classed('active', true);
                        var tempx = d3.event.x - RadVizRadius;
                        var tempy = d3.event.y - RadVizRadius;
                        var updatedAngle = Math.atan2(tempy, tempx);
                        updatedAngle = updatedAngle < 0 ? 2 * Math.PI + updatedAngle : updatedAngle;
                        d.theta = updatedAngle;
                        d.x = RadVizRadius + Math.cos(updatedAngle) * RadVizRadius;
                        d.y = RadVizRadius + Math.sin(updatedAngle) * RadVizRadius;
                        d3.select(this).attr('cx', d.x).attr('cy', d.y);
                        drawdataAnchor();
                        drawdataAnchorLabel();
                        dataAnchor[i] = updatedAngle;
                        findTargetCoordinates(attributesData, normalisedDimensions, dataAnchor);
                        drawdataTable();
                    }

                    /* function to implement plotting of data points
                    inside the big circle */
                    function drawdataTable() {
                        center.selectAll('.circle-data').remove();
                        var dataTableNodes = center.selectAll('.circle-data')
                            .data(attributesData).enter().append('circle').attr('class', 'circle-data')
                            .attr('id', d => d.index)
                            .attr('r', radiusdataTable)
                            .attr('fill', d => d.color)
                            .attr('stroke', 'black')
                            .attr('stroke-width', 0.5)
                            .attr('cx', d => d.x0 * RadVizRadius + RadVizRadius)
                            .attr('cy', d => d.y0 * RadVizRadius + RadVizRadius)
                            .on('mouseenter', function (d) {
                                var mouse = d3.mouse(this);
                                var tip = svg.select('g.tip')
                                    .selectAll('text')
                                    .text(function (k, i) {
                                        return k + ': ' + d[k];
                                    });

                                svg.select('g.tip')
                                    .attr('transform', `translate(${margin.left + mouse[0] + 20},${margin.top + mouse[1] - 120})`);

                                svg.select('g.tip')
                                    .attr('display', 'block');

                                d3.select(this)
                                    .raise()
                                    .transition()
                                    .attr('r', radiusdataTable * 2)
                                    .attr('stroke-width', 2);
                            })
                            .on('mouseout', function (d) {
                                svg.select('g.tip')
                                    .attr('display', 'none');
                                d3.select(this)
                                    .transition()
                                    .attr('r', radiusdataTable)
                                    .attr('stroke-width', 0.5);
                            });
                    }

                    /* function to draw lgend */
                    function drawLegend() {
                        var heightLegend = 25,
                            xLegend = margin.left + RadVizRadius * 1.7,
                            yLegend = 25;

                        var legendtexts = center.selectAll('text.legend')
                            .data(colorclass)
                            .enter()
                            .append('text')
                            .attr('class', 'legend')
                            .attr('x', xLegend + 25 * radiusdataTable)
                            .attr('y', (d, i) => i * yLegend + 5)
                            // .style('margin-left:1px')
                            .text(d => d).attr('font-size', '12pt')
                            .attr('dominat-baseline', 'middle')
                            .on('mouseover', function (d) {
                                //when mouse hover, other classes will be discolored.
                                var tempa = d3.select(DOMRadViz).selectAll('.circle-data');
                                tempa.nodes().forEach((element) => {
                                    var tempb = element.getAttribute('id');
                                    if (attributesData[tempb][targetAttribute] != d) {
                                        d3.select(element).attr('fill-opacity', 0.1)
                                            .attr('stroke-width', 0);
                                    }
                                    else {
                                        d3.select(element).attr('fill-opacity', 1)
                                    }
                                });
                            })
                            .on('mouseout', function (d) {
                                //when mouse move out, display normally.
                                d3.select(DOMRadViz).selectAll('.circle-data')
                                    .attr('fill-opacity', (document.getElementById('opacity').value) / 100)
                                    .attr('stroke-width', (document.getElementById('opacity').value) / 100);
                            });


                        var legendcircle = center.selectAll('circle.legend').data(colorspace)
                            .enter().append('circle')
                            .attr('class', 'legend')
                            .attr('r', radiusdataTable * 2)
                            .attr('cx', xLegend + 50)
                            .attr('cy', (d, i) => i * yLegend)
                            .attr('fill', d => d)
                            .on('mouseover', function (d) {
                                var tempa = d3.select(DOMRadViz).selectAll('.circle-data');
                                tempa.nodes().forEach((element) => {
                                    var tempb = element.getAttribute('id');
                                    if (attributesData[tempb].color != d) {
                                        d3.select(element).attr('fill-opacity', 0.1)
                                            .attr('stroke-width', 0);
                                    }
                                    else {
                                        d3.select(element).attr('fill-opacity', 1)
                                    }
                                });
                            })
                            .on('mouseout', function (d) {
                                //when mouse move out, display normally.
                                d3.select(DOMRadViz).selectAll('.circle-data')
                                    .attr('fill-opacity', (document.getElementById('opacity').value) / 100)
                                    .attr('stroke-width', (document.getElementById('opacity').value) / 100);
                            });

                    }
                });
            }
            return chart;
        }

        /* function to find the position
        of legend on RadViz Plot */
        function legendPositioning() {
            const radviz = d3.select(DOMRadViz);
            d3.select("svg").remove();
            svg = radviz.append('svg')
                .attr('id', 'radviz')
                .attr('width', width)
                .attr('height', height);

            svg.append('rect')
                .attr('fill', 'transparent')
                .attr('width', width / 5)
                .attr('height', height / 3)
                .attr('rx', 10)
                .attr('ry', 10)
                .attr('x', width - 200)
                .attr('y', 0);


            svg.append("text")
                .attr("x", width - 150)
                .attr("y", 30)
                .text(targetAttribute.toUpperCase())
                .attr('font-size', '16pt')
                .attr('font-family', 'Cabin')
                .attr('dominat-baseline', 'middle')
                .style("font-weight", 900);
        }


        /* Initiallize the variables for
        plotting a RadViz Visualisation */
        function initiallizeGrid() {
            radiusdataAnchor = 10,
                radiusdataTable = 3;
            nodecolor = d3.scaleOrdinal(colorMap);
            margin = {
                top: 50,
                right: 250,
                bottom: 50,
                left: 100
            },

                width = 800,
                height = 750;

            RadVizRadius = Math.min((height - margin.top - margin.bottom),
                (width - margin.left - margin.right)) / 2;

        }


        /* Function to normalise data
        the normalised data is appeded in the given data */
        function normalizeCSVdata(dimensions) {
            normalizeSuffix = '_normalized',
                normalisedDimensions = dimensions.map(function (d) {
                    return d + normalizeSuffix;
                }),
                dataAnchor = dataAnchornchor.slice(),
                attributesData = dataAnchorTA.slice();

            attributesData.forEach((d, i) => {
                d.index = i;
                d.id = i;
                d.color = nodecolor(colorScheme(d));
            });

            // Normalising Data in the range of 0 to 1
            attributesData.forEach(function (d) {
                dimensions.forEach(function (dimension) {
                    d[dimension] = +d[dimension];
                });
            });
            var normalizationScales = {};
            dimensions.forEach(function (dimension) {
                normalizationScales[dimension] = d3.scaleLinear().domain(d3.extent(attributesData.map(function (d, i) {
                    return d[dimension];
                }))).range([0, 1]);
            });
            attributesData.forEach(function (d) {
                dimensions.forEach(function (dimension) {
                    d[dimension + '_normalized'] = normalizationScales[dimension](d[dimension]);
                });
            });
            attributesData.forEach(function (d) {
                var dsum = 0;
                normalisedDimensions.forEach(function (k) { dsum += d[k]; }); // sum
                d.dsum = dsum;
            });
            // Data is normalised here
            // console.log(attributesData);
            return dimensions;

        }


    }


    /* 
    Code Referred from:  
    https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.23.1/babel.min.js, 
    https://github.com/WYanChao/RadViz  
    */
    RadViz.DOMRadViz = function (d) {
        if (!arguments.length) {
            return console.log('No RadViz DOM')
        };
        DOMRadViz = d;
        return RadViz;
    };
    RadViz.titles = function (d) {
        if (!arguments.length) {
            return console.log('Input titles')
        };
        titles = d;
        return RadViz;
    };
    RadViz.colorScheme = function (d) {
        if (!arguments.length) {
            return console.log('Input colorScheme');
        }
        colorScheme = d;
        return RadViz;
    };
    RadViz.Dimensionality = function (d) {
        if (!arguments.length) {
            return console.log('Input Dimensionality');
        }
        Dimensionality = d;
        return RadViz;
    };
    RadViz.dataAnchornchor = function (d) {
        if (!arguments.length) {
            return console.log('Input initial dataAnchornchor');
        }
        dataAnchornchor = d;
        return RadViz;
    };
    RadViz.dataAnchorTA = function (d) {
        if (!arguments.length) {
            return console.log('Input dataAnchorTA');
        }
        dataAnchorTA = d;
        return RadViz;
    };

    return RadViz;
};
