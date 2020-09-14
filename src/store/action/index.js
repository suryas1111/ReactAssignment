import * as actionTypes from './actionTypes';
import axios from 'axios';

export const fetchStart = () => {
  return {
      type: actionTypes.GET_DATA_START
  };
};

export const fetchFail = ( error ) => {
  return {
      type: actionTypes.GET_DATA_FAIL,
      payload: error
  };
};

export const fetchSuccess = ( data ) => {
  return {
      type: actionTypes.GET_DATA_SUCCESS,
      payload: data
  };
};



// Action creator
export const getData =() => {
    // Return an action
    return dispatch => {
      dispatch(fetchStart());
      axios.get('https://jsonplaceholder.typicode.com/users')
          .then( res => {
              dispatch(fetchSuccess(res.data))
          } )
          .catch( err => {
              dispatch(fetchFail(err));
          } );
  };
  
};