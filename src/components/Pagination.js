import React, { Component } from 'react'

class Pagination extends Component {
  render(){
    return (
      <div className="pagination-wrapper">
        {this.props.currentPage > 1 &&
          <button onClick={this.props.prevPage}>Previous Page</button>
        }

        {this.props.currentPage < this.props.totalPages &&
          <button onClick={this.props.nextPage}>Next Page</button>
        }

        <style jsx="true">{`
          .pagination-wrapper {
            display: flex;
            justify-content: space-between;
            margin: 20px 10px;
          }
          .pagination-wrapper button {
            cursor: pointer
          }
        `}</style>
      </div>
    )
  }
}

export default Pagination