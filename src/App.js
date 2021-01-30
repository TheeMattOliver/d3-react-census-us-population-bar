import {useState, useEffect} from 'react'
import * as d3 from 'd3'

import ChartTitle from './components/ChartTitle'
import PopulationBarChart from './components/PopulationBarChart'
import { ageVariables, states, getByValue} from './lib/utils'

import './style.css';

function App() {

	const [selectedState, setSelectedState] = useState('All states')
	const [censusData, setCensusData] = useState('')
	const [geography, setGeography] = useState('us')

	const handleChange = (event) => {
		setSelectedState(event.target.value)
		let mapValue = getByValue(states, event.target.value)
		mapValue !== '*' ? setGeography('state') : setGeography('us')
	}

	useEffect(() => {
		d3.json(`https://api.census.gov/data/2019/acs/acs5?get=${d3.keys(ageVariables).join()}&for=${geography}:${getByValue(states, selectedState)}`)
			.then(data => {
				let censusData = d3.nest()
			    .key(([code]) => ageVariables[code])
			    .rollup(values => d3.sum(values, ([code, value]) => +value))
			  .entries(d3.transpose(data).slice(0, -1))
			  .map(({key, value}) => ({name: key, value}))
			  console.log('selectedState: ', selectedState)
			  setCensusData(censusData)
			})
	},[selectedState, geography])

	// Array.from( states ).map(([key, value]) => ({ key, value })); 

	let statesArr = [...states].map(value => value[1]);

  if (!censusData) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
      )
  }

  return (
    <div>
     <ChartTitle data={censusData}/>
     <div className="stateSelector">
				<select 
					value={selectedState}
					// onChange={event => setSelectedState(event.target.value)}
					onChange={handleChange}
					>			
					{statesArr.map((option, index) => (
		      	<option key={index} value={option}>{option} </option>
		      ))}
				</select>
			</div>
			<PopulationBarChart data={censusData}/>
    </div>
  );
}

export default App;
