angular.module('barss',[]).directive('barGraph', function(){
    return {
        restrict:'E',
        scope:{
            bardata:'='
            
        },

        templateUrl:'bar.html',
        link:function(scope,elem,attr){
          
            var width, height,svg,xscale,yscale,xAxis,yAxis;
            width=750;
            height=700;
            // Define SVG
            svg=d3.select(elem[0])
                .append('svg')
                .attr("width",width+50)
                .attr("height",height+100)        
                .append('g')
                .attr("transform","translate(100,10)");
            //Define xscale, yscale, xaxis,yaxis

            xscale = d3.scaleBand().range([0,width]);
            yscale = d3.scaleLinear().range([height,0]);
            xAxis =d3.axisBottom(xscale)
                .scale(xscale);


            yAxis = d3.axisLeft(yscale)
                .scale(yscale);


            //bind data to x ,y 
          
            xscale.domain(scope.bardata.map(function(d){return d.year}));
            yscale.domain([0, d3.max(scope.bardata, function(d){ return d.production})]);
        
            

            svg.selectAll('rect')
                .data(scope.bardata)
                .enter()
                .append('rect')
                .attr('width', 50)
                .attr('height', function(d){return height-yscale(d.production)})
                .attr('x', function(d) {return xscale(d.year)+75})
                .attr('y', function(d) {return yscale(d.production)})
                .style('fill', "blue");
            
           svg.append('g')
              .attr("class", "axis axis-x")
              .attr("transform", "translate(0,"+height+")")
              .call(xAxis);
            
            svg.append('g')
               .attr("class", "axis axis--y")
               .call(yAxis)
            
           
          
            

//            scope.$watch("bardata",function(){
//
//                    console.log(scope.bardata);
//
//                }, 
//                true
//
//            );

        },


    }
})

