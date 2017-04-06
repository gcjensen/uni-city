angular.module('open-data').component('map', {
    templateUrl: '/javascript/components/map/map.html',
    controller: 'MapController',
});


angular.module('open-data').controller('MapController', function ($scope) {

    var width = 960,
        height = 1160;
    
    var svg = d3.select("body")
                  .append("svg")
                  .attr("width", width)
                  .attr("height", height);

    d3.json("javascript/components/map/uk.json", function(error, topology) {
        if( error ) throw error;

        var data = topojson.feature(topology, topology.objects.borders);

        var projection = d3.geoAlbers()
                           .center([0, 55.4])
                           .rotate([4.4, 0])
                           .parallels([50, 60])
                           .scale(6000)
                           .translate([width / 2, height / 2]);

        var path = d3.geoPath()
                     .projection(projection);

        svg.selectAll(".lad")
                .data(topojson.feature(topology, topology.objects.borders).features)
            .enter().append("path")
                .attr("class", function(d) { return "borders " + d.properties.ADM0_A3; })
                .attr("d", path);

        // Borders
        svg.append("path")
           .datum(topojson.mesh(topology, topology.objects.borders))
           .attr("d", path)
           .attr("class", "borders-boundary");

        // Cities
        svg.append("path")
           .datum(topojson.feature(topology, topology.objects.cities))
           .attr("d", path)
           .attr("class", "city");

        svg.selectAll(".city-label")
             .data(topojson.feature(topology, topology.objects.cities).features)
           .enter().append("text")
                   .attr("class", "city-label")
                   .attr("transform", function(d) { return "translate(" + projection(d.geometry.coordinates) + ")"; })
                   .attr("dy", ".35em")
                   .text(function(d) { return d.properties.ADM1NAME; });

        svg.selectAll(".city-label")
           .attr("x", function(d) { return d.geometry.coordinates[0] > -1 ? 6 : -6; })
           .style("text-anchor", function(d) { return d.geometry.coordinates[0] > -1 ? "start" : "end"; });
     });
});