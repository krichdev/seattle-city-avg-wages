import React, { Component } from 'react'

class Filters extends Component{
  handleDifferenceChange = (qty) => {
    this.props.onDifferenceEnter(qty);
  }
  render(){
    return(
      <div className="filter-row">
        <p>Filters:</p>
        <button className={this.props.womenMoreFilter ? 'btn active' : 'btn'} onClick={() => this.props.womenMakesMore()}>Females Make More</button>
        <button className={this.props.menMoreFilter ? 'btn active' : 'btn'} onClick={() => this.props.menMakesMore()}>Males Make More</button>
        <label>Minimum Pay Difference:</label>
        <input type="number" placeholder=".30" onKeyUp={event => this.handleDifferenceChange(event.target.value)} />
        
        <style jsx="true">{`
          .filter-row {
            display: flex;
            align-items: center;
            justify-content: space-around;
          }
          .btn {
            background-color: #ffd262;
            color: #552600;
            border-radius: 0.3rem;
            border: 1px solid #e4b34f;
            padding: .5rem;
            cursor: pointer;
          }
          .btn:focus {outline: 0;}
          input:focus {outline: 0}
          .active {
            background-color: #552600;
            color: #ffd262;
            border-color: transparent;
          }
        `}</style>
      </div>
    )
  }
}

export default Filters