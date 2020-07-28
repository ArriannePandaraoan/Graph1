(function (d3) {
  'use strict';

  const svg = d3.select('svg');

  const width = +svg.attr('width');
  const height = +svg.attr('height');

  const render = data => {
    const title = 'Oats and Alfalfa';
    const xValue = d => d.Year;
    const xAxisLabel = 'Year';
    const yValue = d => d.Planting;
    const yAxisLabel = 'Planting Date';
    const margin = { top: 70, right: 45, bottom: 80, left: 130 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    
    const xScale = d3.scaleTime()
    	.domain(d3.extent(data, xValue))
    	.range([0, innerWidth])
      .nice();

    const yScale = d3.scaleTime()
    	.domain(d3.extent(data, yValue))
    	.range([innerHeight, 0])
     	.nice();
    
    const g = svg.append('g')
    	.attr('transform', `translate(${margin.left},${margin.top})`);
    
    const xAxis = d3.axisBottom(xScale)
    	.tickSize(-innerHeight)
    	.tickPadding(20);
    
    const yAxis = d3.axisLeft(yScale)
    	.tickSize(-innerWidth)
      .tickPadding(20);
    
    const yAxisG = g.append('g').call(yAxis);
    yAxisG.selectAll('.domain').remove();
    
    yAxisG.append('text')
    	.attr('class', 'axis-label')
    	.attr('y', -102)
    	.attr('x', -innerHeight/2)
      .attr('fill', 'white')
      .style('opacity', 0.5)
    	.attr('transform', `rotate(-90)`)
    	.style('text-anchor', 'middle')
    	.text(yAxisLabel);
    
    const xAxisG = g.append('g').call(xAxis)
    	.attr('transform', `translate(0,${innerHeight})`);
    
    xAxisG.select('.domain').remove();
    
    xAxisG.append('text')
    	.attr('class', 'axis-label')
    	.attr('y', 75)
    	.attr('x', innerWidth / 2)
      .attr('fill', 'white')
      .style('opacity', 0.5)
    	.text(xAxisLabel);
    
    const lineGenerator = d3.line()
    	.x(d => xScale(xValue(d)))
    	.y(d => yScale(yValue(d)));
    
    
    g.append('path')
    	.attr('class', 'line-path')
    	.attr('d', lineGenerator(data));

    g.append('text')
    	.attr('class', 'title')
    	.attr('y', -27)
    	.attr('x', 200)
    	.text(title);
               
  };

  d3.csv('data.csv').then(data => {
    data.forEach(d => {
    	d.Planting = new Date (d.Planting);
      d.Year = new Date(d.Year);

    });
    render(data);
  });

}(d3));

