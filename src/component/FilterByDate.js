import React from 'react';
import './FilterBYDate.css';

const FilterByDate = (props) => {
  return (
    <div>
        <input className="middleText" type="date" onChange={props.setSDate}></input>
        <input className="middleText" type="date" onChange={props.setEDate}></input>
    </div>
  );
};

export default FilterByDate;