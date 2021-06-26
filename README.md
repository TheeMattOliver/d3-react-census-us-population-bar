# US Population by State w/D3 + React Hooks

**Using the Census API with D3 and React hooks.**

Deployed: https://theemattoliver.github.io/d3-react-census-us-population-bar/


![US Population by State](https://media.giphy.com/media/b7oOvLcLr9e3IAaVJr/giphy.gif)


Uses the `ResizeObserver` API on the `ref` dimensions: 


`const wrapperRef = useRef();
const dimensions = useResizeObserver(wrapperRef).
`

Watches for changes to dimensions and re-renders as necessary.

    useEffect(() => {
    const svg = d3.select(svgRef.current);
    // use resized dimensions
    const { width, height } = dimensions || wrapperRef.current.getBoundingClientRect(); 
    // do a bunch of D3 stuff here
    // ...
    }, [data, dimensions])
  
Uses `flex` for the svg wrapper:

```
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  ```
