import React, { Component } from 'react';
import './App.css';
import MovieTable from './components/MovieTable'
class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            <MovieTable />
        </header>
      </div>
    );
  }
}

export default App;
