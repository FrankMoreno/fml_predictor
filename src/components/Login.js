import React, { Component } from 'react'
import { Route, Redirect } from 'react-router'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email:"",
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
        // TODO Figure out if I really need cors here or not 
        event.preventDefault();

        let formData = new FormData();
        formData.append('email', this.state.email);
        formData.append('password', this.state.password);

        fetch('https://thanx-fml-api.herokuapp.com/login', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(
            result => {
                let authToken = result.authToken;
                if(authToken !== '{}') {
                    this.props.onLogin(authToken);
                    // Reroute
                }
            },
            error => {
                console.log(error);
            }
        );
    }

    render() {
        return (
            <div>
                <h1>Frank's Movie League</h1>
                <form id="loginForm" onSubmit={this.submitLoginInfo}>
                    <p>
                        <label>Login:</label> 
                        <input name="email" type="text" placeholder="example@test.com" onChange={this.onInputChange}/>
                    </p>
                    <p>
                        <label>Password:</label>
                        <input name="password" type="password" placeholder="password" onChange={this.onInputChange}/>
                    </p>
                    <button type="submit">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;