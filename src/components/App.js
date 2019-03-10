import React, { Component } from 'react'; 
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import MovieTable from './MovieTable'

// TODO Should probably slide a lot of this routing logic into different component

function EverythingElse(props) {
  return (
    <Switch>
      <Route exact path = '/app'
        render={() => <Redirect to='/app/movies'/>}
      />
      <Route path='/app/movies' component={MovieTable}/>
    </Switch>
  );
}

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
            <Redirect to="/app"/> : 
            <Login onLogin={this.onLogin}/>
          )}
        />
        <Route path='/app' 
          render={(routeProps) => (
            this.state.isLoggedIn ? 
            <EverythingElse isLoggedIn={this.isLoggedIn} match={routeProps}/> : 
            <Redirect to='/'/>
          )}
        />
        </Switch>
    );
  }
}

export default App;
