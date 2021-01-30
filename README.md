# US Population by State w/D3 + React Hooks

https://theemattoliver.github.io/d3-react-census-us-population-bar/

Use the `ResizeObserver` API on the `ref` dimensions in our chart: 


`const wrapperRef = useRef();
const dimensions = useResizeObserver(wrapperRef).
`

Use hooks to watch for changes to dimensions and re-render as necessary.

    useEffect(() => {
    const svg = d3.select(svgRef.current);
    // use resized dimensions
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect();
    
    // do a bunch of D3 stuff here    
  }, [data, dimensions])
