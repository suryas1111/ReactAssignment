import React from 'react';
import './CampaignTable.css';

const CampaignTable = (props) => {
    return props.displayData.map(ele=>{
      let budget=Math.ceil(ele.Budget/1000);
      return(
          <tr key={ele.userId}>
              <td>
                  {"Campaign "+ele.id}
              </td>
              <td>
                  {ele.username}
              </td>
              <td>
                  {ele.startDate}
              </td>
              <td>
                  {ele.endDate}
              </td>
              <td>
              <label className="container">Active
                  <span className="checkmark" style={{backgroundColor:"green"}}></span>
              </label>
              </td>
              <td>
                  {budget+"K USD"}
              </td>
          </tr>
      );
  });
};

export default CampaignTable;