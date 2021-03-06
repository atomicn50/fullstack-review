import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
    this.getTopRepos = this.getTopRepos.bind(this);
  }

  getTopRepos() {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      contentType: 'application/json',
      success: (repos) => {
        this.setState({
          repos: repos
        });
      },
      error: (err) => {
        console.log('error', err)
      }
    });
  }

  search (term) {
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({username: term}),
      success: (repos) => {
        this.getTopRepos()
      },
      error: (err) => {
        console.log('error', err);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <RepoList repos={this.state.repos}/>
      <Search onSearch={this.search.bind(this)}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));