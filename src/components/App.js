import React, { Component } from 'react'; 
import { Switch, Route, Redirect } from 'react-router-dom'
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
          render={() => (
            this.state.isLoggedIn ? 
            <Redirect to="/movies"/> : 
            <Login onLogin={this.onLogin}/>
          )}
        />
        <Route exact path='/movies' 
          render={() => (
            this.state.isLoggedIn ? 
            <MovieTable isLoggedIn={this.isLoggedIn}/> : 
            <Login onLogin={this.onLogin}/>
          )}
        />
      </Switch>
    );
  }
}

export default App;
