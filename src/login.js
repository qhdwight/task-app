import React, { Component } from 'react';
import LoginForm from './loginform.js'
import SignupForm from './signupform.js'
import './style.css';

class Login extends Component {
  render() {
    return (
        <div id='login-container'>
            <LoginForm />
        </div>
    );
  }
}

export default Login;
