import {useState, useEffect} from 'react';
import { sum } from 'd3';
import { ageVariables, states, getByValue, sumArray } from '../lib/utils'


const ChartTitle = (props) => {

	const index = new Map(props.data.map((d, i) => [d, i]));
  let sums = [...props.data].map(d => Array.from(ageVariables, V => sum(V, v => d[index.get(v)])))
  // console.log('sums: ', sums)
  // const sumArray = (array) => {
  //  const newArray = [];
  //  array.forEach(sub => {
  //     sub.forEach((num, index) => {
  //        if(newArray[index]){
  //           newArray[index] += num;
  //        }else{
  //           newArray[index] = num;
  //        }
  //     });
  //  });
  //  return newArray;
  // }

  // const populations = sumArray(sums)
  // let totalPopulation = populations.reduce(function(accumulator, currentValue, currentIndex, array) {
  //   return accumulator + currentValue
  // })

  // console.log('totalPopulation: ', totalPopulation)

	return (
		<h2 className="title">US Population by Age, by State. </h2>
		)
}

export default ChartTitle