import React, { Component } from 'react';
import Row from './components/Row';
import Pagination from './components/Pagination'
import Filters from './components/Filters'

class App extends Component {
  state = {
    data: [],
    womenMoreData: [],
    menMoreData: [],
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
    },
    womenMoreFilter: false,
    menMoreFilter: false
  }

  componentDidMount(){
   this.getInitialState();
  }

  getInitialState = () => {
    const url = 'https://data.seattle.gov/api/views/cf52-s8er/rows.json?api_key=SCC1c0Cove7ypmBeuf3dTX2WZOk6qEfCAki6MoNi'
    fetch(url)
      .then(res => res.json())
        .then(data => this.setState({
          data: data.data,
          totalPages: Math.ceil(data.data.length / 25),
          womenMoreData: data.data.filter(item => item[12] && item[9] > item[12]),
          menMoreData: data.data.filter(item => item[9] && item[12]> item[9])
        }))
  }

  sortResults = (column) => {
    let currentFilterData;
    let currentFilterKey;
    if(this.state.womenMoreFilter && !this.state.menMoreFilter){
      currentFilterData = this.state.womenMoreData;
      currentFilterKey = 'womenMoreData'
    }else if (!this.state.womenMoreFilter && this.state.menMoreFilter){
      currentFilterData = this.state.menMoreData;
      currentFilterKey = 'menMoreData'
    }else {
      currentFilterData = this.state.data;
      currentFilterKey = 'data'
    }
    
    this.setState({
        currentFilterKey : column === 'diff'
          ? currentFilterData.sort((a, b) => (
            this.state.sort[column] === 'asc'
              ? (a[9] - a[12]) - (b[9] - b[12])
              : (b[9] - b[12]) - (a[9] - a[12])
          ))
          : currentFilterData.sort((a, b) => (
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

  womenMakesMore = () => {
    this.setState({
      totalPages: !this.state.womenMoreFilter ? Math.ceil(this.state.womenMoreData.length / 25) : Math.ceil(this.state.data.length / 25),
      womenMoreFilter: !this.state.womenMoreFilter,
      menMoreFilter: false
    })
  }

  menMakesMore = () => {
    this.setState({
      totalPages: !this.state.menMoreFilter ? Math.ceil(this.state.menMoreData.length / 25) : Math.ceil(this.state.data.length / 25),
      womenMoreFilter: false,
      menMoreFilter: !this.state.menMoreFilter
    })
  }

  render() {
    return (
      <div>
        <Filters
          womenMakesMore={() => this.womenMakesMore()}
          menMakesMore={() => this.menMakesMore()}
        />
        <table>
          <tbody>
            <tr>
              <th>Job Title</th>
              <th className="sortable" onClick={() => this.sortResults('female')}>Avg. Female Wage</th>
              <th className="sortable" onClick={() => this.sortResults('male')}>Avg. Male Wage</th>
              <th className="sortable" onClick={() => this.sortResults('diff')}>Difference</th>
            </tr>
            {(!this.state.menMoreFilter && !this.state.womenMoreFilter) &&
              this.state.data.map((item, i) => i >= this.state.pagination.start && i <= this.state.pagination.end && <Row key={i} data={item} />)}
            {(!this.state.menMoreFilter && this.state.womenMoreFilter) &&
              this.state.womenMoreData.map((item, i) => i >= this.state.pagination.start && i <= this.state.pagination.end && <Row key={i} data={item} />)}
            {(this.state.menMoreFilter && !this.state.womenMoreFilter) &&
              this.state.menMoreData.map((item, i) => i >= this.state.pagination.start && i <= this.state.pagination.end && <Row key={i} data={item} />)}
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
