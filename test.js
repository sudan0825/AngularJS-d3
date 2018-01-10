var app = angular.module('angularD3', []);
app.controller('mainCtrl',function($scope){


    //the width and height of svg
    var width = 800;
    var height = 800;


  


    //color range
    var color = d3.scaleOrdinal(["#98abc5", "#8a89a6", "#7b6888", "#6b486b"]);


    //create svg on the div container
    $scope.svg=d3.select("#drawingfield")
        .append("svg")
        .attr("width", width)
        .attr("height", height)

    //group the graph together
    var group = $scope.svg.append("g")
    .attr("transform", "translate(400,400)");

    //define the radious and circle type(whole circle or part of circle)
    r=300;

    d3.json("data.json", function(error, data){
        
        if(error) throw error
 //draw line based on the value in the data array
    var tarc = d3.arc()
    .innerRadius(0)
    .outerRadius(r)
    var pie = d3.pie()
    .sort(null)
    .value(function(d){return d})
 

    var arcs = group.selectAll(".tarc")
    .data(pie(data))
    
    .enter()
    .append("g")
    .attr("class","arc");
    
    arcs.append("path")
        .attr("d", tarc)
    .attr("fill",function(d){
        return color(d.data)
    })
    arcs.append("text")
    .attr("transform", function(d){return "translate("+tarc.centroid(d)+")";})
    .text(function(d) {return d.data})

    })
   


})

