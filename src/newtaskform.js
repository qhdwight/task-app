import React, { Component } from 'react';
import firebase from 'firebase';
import TaskApp from './index'

class NewTaskForm extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(event) {
        // Prevent form from refreshing page
        event.preventDefault();
        const task = {
            name: this.taskName.value,
            status: 0
        };
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/tasks').push(task, error => {
            if (error)
                alert('An error ocurred: ' + error.message);
            else
                TaskApp.renderTasks();
        });
    }
    render() {
        return (
            <div id='form-container'>
                <form onSubmit={this.handleSubmit}>
                    <h1>Create New Task</h1>
                    <h3>Name</h3>
                    <input type='text' ref={taskName => this.taskName = taskName} />
                    <input type='submit' name='submit' value='Create' />
                </form>
            </div>     
        );
    }
}

export default NewTaskForm;
