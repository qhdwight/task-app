import React, { Component } from 'react';
import firebase from 'firebase';

class SignupForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.email.value, this.password.value).catch(error => {
            alert('An error ocurred: ' + error.message);
        });
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h1>Sign Up</h1>
                <h3>E-Mail</h3>
                <input type='text' ref={email => this.email = email} />
                <h3>Password</h3>
                <input type='password' name='password' ref={password => this.password = password} />
                <input type='submit' name='submit' value='Sign Up' />
            </form>     
        );
    }
}

export default SignupForm;
