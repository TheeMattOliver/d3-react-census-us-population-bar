import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import useResizeObserver from '../hooks/useResizeObserver';

function PopulationBarChart({ data, property }) {
  console.log('here is the data the chart wants: ', data)
  const svgRef = useRef();
  const wrapperRef = useRef();
  // get current dimensions of the element we give it
  const dimensions = useResizeObserver(wrapperRef);

  useEffect(() => {
    console.log('Render, dimensions: ', dimensions)
    const svg = d3.select(svgRef.current);
    // use resized dimensions
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    const margin = { top: 5, right: 5, bottom: 5, left: 5 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const yScale = d3.scaleBand()
      .domain(data.map(d => d.name))
      .range([innerHeight - margin.bottom, margin.top])
      .padding(0.1)

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([margin.left, innerWidth - margin.right])

    svg.append("g")
      .attr("class", "x-axis");

    svg.append("g")
      .attr("class", "y-axis");

    svg.select(".x-axis")
      .attr("transform", `translate(0,${innerHeight - margin.bottom})`)
      .call(g => g.transition().call(d3.axisBottom(xScale).ticks(width / 80, "s")))
      .call(g => g.select(".domain").remove());

    svg.select(".y-axis")
      .attr("transform", `translate(${margin.left},0)`)
      .call(g => g.transition().call(d3.axisLeft(yScale).tickSizeOuter(0)));

    svg.append("g")
      .attr("fill", "steelblue")
      .selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("class", "bar")
      .attr("width", 0);

    svg.append("g")
      .attr("fill", "white")
      .attr("text-anchor", "end")
      .style("font", "12px sans-serif")
      .selectAll("text")
      .data(data)
      .enter().append("text")
      .attr("class", "label")
      .attr("dy", "0.35em")
      .attr("x", xScale(0) - 4);

    svg.selectAll(".bar")
      .data(data, d => d.name)
      .attr("x", xScale(0))
      .attr("y", d => yScale(d.name))
      .attr("height", yScale.bandwidth())
      .transition()
      .delay((d, i) => i * 20)
      .attr("width", d => xScale(d.value) - xScale(0));

    svg.selectAll(".label")
      .data(data, d => d.name)
      .attr("y", d => yScale(d.name) + yScale.bandwidth() / 2)
      .text(d => d.value.toLocaleString())
      .transition()
      .delay((d, i) => i * 20)
      .attr("x", d => xScale(d.value) - 4);

  }, [data, dimensions, property])

  const svgStyles = {
    "height": "500px",
    "marginTop": "5px"
  }

  return (
    <div ref={wrapperRef} style={{ marginBottom: '2rem ' }}>
      <svg ref={svgRef} style={svgStyles}></svg>
    </div>
  )

}

export default PopulationBarChart;