import React, { Component } from 'react';
import './App.css';
import MovieTable from './components/MovieTable'
import Login from './components/Login'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
            {/* <MovieTable /> */}
            <Login />
        </header>
      </div>
    );
  }
}

export default App;
