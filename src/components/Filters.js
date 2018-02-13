import React, { Component } from 'react'

class Filters extends Component{
  render(){
    return(
      <div>
        <p>Filters:</p>
        <button onClick={() => this.props.womenMakesMore()}>Women Makes More</button>
        <button onClick={() => this.props.menMakesMore()}>Men Makes More</button>
      </div>
    )
  }
}

export default Filters