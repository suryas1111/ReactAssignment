import React from 'react';
import './FilterBYDate.css';

const FilterByDate = (props) => {
  return (
    <div>
        <input className="middleText" id="sdate" type="date" onChange={props.setSDate}></input>
        <input className="middleText" id="edate" type="date" onChange={props.setEDate}></input>
        <button onClick={props.onSubmit}>Filter</button>
    </div>
  );
};

export default FilterByDate;