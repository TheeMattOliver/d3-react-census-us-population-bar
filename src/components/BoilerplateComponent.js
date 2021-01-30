import React, { useRef, useEffect } from 'react';
import { select } from 'd3';
import useResizeObserver from '../hooks/useResizeObserver';

function BoilerPlate({ data, property }) {
  const svgRef = useRef();
  const wrapperRef = useRef();
  // get current dimensions of the element we give it
  const dimensions = useResizeObserver(wrapperRef);

  // will be called initially and on every data change
  useEffect(() => {
    const svg = select(svgRef.current);
    
    // use resized dimensions; instead of skipping it if dimensions are undefined,
    // we fall back to the boundingClientRect of this DOM element if the dimensions are
    // null at the very beginning
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();


  }, [data, dimensions, property])

  return(
    <div ref={wrapperRef} style={{ marginBottom: '2rem '}}>
      {/*render an svg that and access it in the useEffect hook after the dom elements have been rendered*/}
      <svg ref={svgRef}></svg>
    }
    </div>
    )

}

export default BoilerPlate;