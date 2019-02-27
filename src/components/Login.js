import React, { Component } from 'react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login:"",
            password:""
        };

        this.onInputChange = this.onInputChange.bind(this);
        this.submitLoginInfo = this.submitLoginInfo.bind(this);
    }

    onInputChange(event) {
        const target = event.target.name;
        const value = event.target.value;

        this.setState({[target] : value});
    }

    submitLoginInfo(event) {
        event.preventDefault();

        fetch('https://thanx-fml-api.herokuapp.com/login', {
            method: 'POST',
            body: JSON.stringify(this.state),
            credentials: 'include',
            mode: 'no-cors'
        });
    }

    render() {
        return (
            <div>
                <h1>Frank's Movie League</h1>
                <form id="loginForm">
                    <p>
                        <label>Login:</label> 
                        <input name="login" type="text" placeholder="example@test.com" onChange={this.onInputChange}/>
                    </p>
                    <p>
                        <label>Password:</label>
                        <input name="password" type="password" placeholder="password" onChange={this.onInputChange}/>
                    </p>
                    <button onClick={this.submitLoginInfo}>Login</button>
                </form>
            </div>
        )
    }
}

export default Login;