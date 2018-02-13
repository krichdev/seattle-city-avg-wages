import React, { Component } from 'react';

class Header extends Component {
  render(){
    return (
      <div>
        <tr>
          <th>Job Title</th>
          <th>Avg. Female Wage</th>
          <th>Avg. Male Wage</th>
          <th>Difference</th>
        </tr>
        
      </div>
    )
  }
}

export default Header