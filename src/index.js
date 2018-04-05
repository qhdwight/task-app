import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import Login from './login';
import Tasks from './tasks';
import NewTaskForm from './newtaskform'
import firebase from 'firebase';

class TaskApp {
    constructor() {
        const config = {
            apiKey: 'AIzaSyBPw77zVbw_7k9wVleGD0QjVh3wGrOoY3s',
            authDomain: 'taskapp-fb82c.firebaseapp.com',
            databaseURL: 'https://taskapp-fb82c.firebaseio.com',
            projectId: 'taskapp-fb82c',
            storageBucket: '',
            messagingSenderId: '1023939079882'
        }
        TaskApp.mainContent = document.getElementById('main-content');
        firebase.initializeApp(config);
        firebase.auth().onAuthStateChanged(user => {
            if (user)
                TaskApp.renderTasks();
            else
                TaskApp.renderLogin();
        });
    }
    static renderTasks() {
        ReactDOM.render(<Tasks />, TaskApp.mainContent)
    }  
    static renderLogin() {
        ReactDOM.render(<Login />, TaskApp.mainContent);
    }
    static renderNewTaskForm(callback) {
        ReactDOM.render(<NewTaskForm onFinishTask={task => callback(task)} />, TaskApp.mainContent);
    }
}

export default TaskApp;

new TaskApp();
