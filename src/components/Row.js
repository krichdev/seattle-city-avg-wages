import React, { Component } from 'react';
import { Icon } from 'react-fa';

class Row extends Component {
  render(){
    return (
      <tr>
        <td>{this.props.data[8]}</td>
        <td>{this.props.data[9] ? `$${this.props.data[9]}` : `Not Available`}</td>
        <td>{this.props.data[12] ? `$${this.props.data[12]}` : `Not Available`}</td>
        <td>{this.props.data[9] >= this.props.data[12] ? 
              `$${(this.props.data[9] - this.props.data[12]).toFixed(2)}` :
              `$${(this.props.data[12] - this.props.data[9]).toFixed(2)}`}
              {this.props.data[9] !== this.props.data[12] &&
                <Icon className="icon" 
                      name={this.props.data[9] > this.props.data[12] ?
                      `female` :
                      `male`
                  }/>
              }
        </td>

        <style jsx="true">{`
          .icon {
            margin-left: 10px;
          }
        `}</style>
      </tr>
    )
  }
}

export default Row