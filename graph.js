var app = angular.module('angularD3',['barss']);
app.controller('mainCtrl',function($scope){

    $scope.data=[{"year":"first", "production":600},{"year":"second", "production":300},{"year":"third", "production":500},{"year":"fourth", "production":800}]


    $scope.drawing = function(){
        d3.select("#pie").remove();

        //color range
        var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);
        //Create a svg in the div 
        var svg = d3.select("#drawingfield")
        .append("svg")
        //set svg width and height
        .attr("width", $scope.width||800)

        .attr("height", $scope.height||800)
        .attr("id", "pie");


        //group the graph together and transform the svg position to a specific place
        var group = svg.append('g')
        .attr('transform', `translate(${$scope.width/2||200},${$scope.height/2||200})`);




        //create an arc

        var creatArc = d3.arc()
        .innerRadius(0)
        .outerRadius($scope.r||200);



        //draw a pie based on the data or say bind the data to pie
        var pie =d3.pie()
        .sort(null)
        .value(function(d){return d.production})
        //group all of arcs together and draw on svg

        var arcs =  group.selectAll(".creatArc")
        .data(pie($scope.data))
        .enter()
        .append("g")
        .attr("class", "creatArc");

        arcs.append("path")
            .attr("d", creatArc)
            .attr("fill", function(d){
            return color(d.data.production)
        })
        arcs.append("text")
            .attr("transform", function(d){
            return "translate("+creatArc.centroid(d)+")";
        })   
            .text(function(d){
            return d.data.year
        })

    }
//drawingBar();
//    function drawingBar(){
//        var barsvg = d3.select('#barChart')
//        .append("svg")
//        .attr("width", $scope.width||800)
//        .attr("height", $scope.height||800)
//        .attr("id", "bar");
//
//        var group = barsvg.append('g')
//       
//
//       group.selectAll('bar')
//        .data($scope.data)
//        .enter()
//        .append('rect')
//        .attr("x",function(d){return x(d.year)})
//        .attr("width", x.bandwidth())
//        .attr("y", function(d){return y(d.production)})
//        .attr("height", function(d){return height-y(d.production)})
//        
//        
//
//
//        }
//.style("fill", "steelblue")
//      .attr("x", function(d) { return x(d.date); })
//      .attr("width", x.rangeBand())
//      .attr("y", function(d) { return y(d.value); })
//      .attr("height", function(d) { return height - y(d.value); });



})

