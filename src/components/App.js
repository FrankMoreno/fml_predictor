import React, { Component } from 'react';
import '../App.css';
import { Switch, Route } from 'react-router-dom'
import Login from './Login'
import MovieTable from './MovieTable'

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: false,
      authToken: ""
    };
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin(newAuthToken) {
    this.setState({
      isLoggedIn : true,
      authToken : newAuthToken
    });
  }

  render() {
    return (
      <Switch>
        <Route exact path='/' 
              render={() => (<Login onLogin={this.onLogin}/>)}
        />
        <Route exact path='/movies' 
              render={() => (<MovieTable isLoggedIn={this.isLoggedIn}/>)}
        />
      </Switch>
    );
  }
}

export default App;
