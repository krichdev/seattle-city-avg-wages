import React, { Component } from 'react';
import Row from './components/Row';
import Pagination from './components/Pagination'
import Filters from './components/Filters'

class App extends Component {
  state = {
    data: [],
    pageSize: 24,
    totalPages: 0,
    currentPage: 1,
    pagination: {
      start: 0,
      end: 24
    },
    sort: {
      female: 'asc',
      male: 'asc',
      difference: 'asc'
    },
    columnIndex: {
      female: 9,
      male: 12
    }
  }

  componentDidMount(){
    const url = 'https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6qEfCAki6MoNi'
    fetch(url)
      .then(res => res.json())
        .then(data => this.setState({ data: data.data, totalPages: Math.ceil(data.data.length / 25)}))
  }

  sortResults = (column) => {
    this.setState({
        data: column === 'diff' 
          ? this.state.data.sort((a, b) => (
            this.state.sort[column] === 'asc'
              ? (a[9] - a[12]) - (b[9] - b[12])
              : (b[9] - b[12]) - (a[9] - a[12])
          ))
          : this.state.data.sort((a, b) => (
            this.state.sort[column] === 'asc'
            ? a[this.state.columnIndex[column]] - b[this.state.columnIndex[column]]
            : b[this.state.columnIndex[column]] - a[this.state.columnIndex[column]]
        )),
        sort: {
          [column]: this.state.sort[column] === 'asc' ? 'desc' : 'asc'
        }
    })
  }

  nextPage = () => {
    this.setState({
      currentPage: this.state.currentPage + 1,
      pagination: {
        start: this.state.pagination.start + this.state.pageSize,
        end: this.state.pagination.end + this.state.pageSize
      }
    })
  }

  prevPage = () => {
    this.setState({
      currentPage: this.state.currentPage - 1,
      pagination: {
        start: this.state.pagination.start - this.state.pageSize,
        end: this.state.pagination.end - this.state.pageSize
      }
    })
  }

  render() {
    return (
      <div>
        <Filters />
        <table>
          <tbody>
            <tr>
              <th>Job Title</th>
              <th className="sortable" onClick={() => this.sortResults(`female`)}>Avg. Female Wage</th>
              <th className="sortable" onClick={() => this.sortResults(`male`)}>Avg. Male Wage</th>
              <th className="sortable" onClick={() => this.sortResults(`diff`)}>Difference</th>
            </tr>
            {this.state.data.map((item, i) => i >= this.state.pagination.start && i <= this.state.pagination.end && <Row key={i} data={item} />)}
          </tbody>
        </table>
        
        <Pagination totalPages={this.state.totalPages}
                    currentPage={this.state.currentPage}
                    nextPage={() => {this.nextPage()}}
                    prevPage={() => {this.prevPage()}}
        />
        <style jsx="true">{`
          table {
            width: 100%;
          }
          table, th, td {
            border: 1px solid black;
            border-collapse: collapse;
          }
          th, td {
            padding: 15px;
          }
          .sortable {
            cursor: pointer
          }
        `}</style>
      </div>
    );
  }
}

export default App;
