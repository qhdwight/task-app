import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Login from './login';
import Tasks from './tasks';
import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyBPw77zVbw_7k9wVleGD0QjVh3wGrOoY3s',
    authDomain: 'taskapp-fb82c.firebaseapp.com',
    databaseURL: 'https://taskapp-fb82c.firebaseio.com',
    projectId: 'taskapp-fb82c',
    storageBucket: '',
    messagingSenderId: '1023939079882'
}
firebase.initializeApp(config);

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        const tasks = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/tasks').once('value', snapshot => {
            ReactDOM.render(<Tasks tasks = {snapshot.val()}/>, document.getElementById('main-content'));
        }, error => {
            alert('An error ocurred: ' + error.message);
        });
    } else {
        ReactDOM.render(<Login />, document.getElementById('main-content'));
    }
})