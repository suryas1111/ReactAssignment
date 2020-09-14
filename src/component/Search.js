import React from 'react';
import './Search.css';

const Search = (props) => {
  return (
    <div>
        <input className="centerText" type="text" placeholder="Search by name" onChange={props.onChange}></input>
    </div>
  );
};

export default Search;