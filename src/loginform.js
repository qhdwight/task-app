import React, { Component } from 'react';
import firebase from 'firebase';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        // Prevent form from refreshing page
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.email.value, this.password.value).catch(error => {
            alert('Error code: ' + error.code + ', ' + error.message);
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Login</h1>
                <h3>E-Mail</h3>
                <input type='text' ref={email => this.email = email} />
                <h3>Password</h3>
                <input type='password' name='password' ref={password => this.password = password} />
                <input type='submit' name='submit' value='Login' />
            </form>     
        );
    }
}

export default LoginForm;
