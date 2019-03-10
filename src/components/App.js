import React, { Component } from 'react'; 
import { Switch, Route, Redirect } from 'react-router-dom'
import Login from './Login'
import MovieTable from './MovieTable'

// TODO Slide this into its own component
function EverythingElse(props) {
  return (
    <div>
      <Switch>
        <Route exact path = '/app'
          render={() => <Redirect to='/app/movies'/>}
        />
        <Route path='/app/movies' component={MovieTable}/>
      </Switch>
    </div>
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
      // TODO Probably a better way to do this other than
      // checking for every route
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
