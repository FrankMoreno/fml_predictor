import React, { Component } from 'react'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login:"",
            passwor:""
        };
    }
    render() {
        return (
            <div>
                <h1>Frank's Movie League</h1>
                <form id="loginForm">
                    <p>
                        <label>Login:</label> 
                        <input type="text" placeholder="example@test.com"/>
                    </p>
                    <p>
                        <label>Password:</label>
                        <input type="text" placeholder="password"/>
                    </p>
                </form>
            </div>
        )
    }
}

export default Login;