import React, { Component } from 'react';
import './style.css';
import firebase from 'firebase'

class Tasks extends Component {
  render() {
    const currentUser = firebase.auth().currentUser;
    const newTasks = [], inProgressTasks = [], doneTasks = [];
    for (var i = 0; i < this.props.tasks.length; i++) {
        switch(this.props.tasks[i]['status']) {
        case 0:
          newTasks.push(<div class='task-item new-task-item'><p>{this.props.tasks[i]['name']}</p></div>);
          break;
        case 1:
          inProgressTasks.push(<div class='task-item in-progress-task-item'><p>{this.props.tasks[i]['name']}</p></div>);
          break;
        case 2:
          doneTasks.push(<div class='task-item done-task-item'><p>{this.props.tasks[i]['name']}</p></div>);
          break;
        }
    }
    return (
      <div id='tasks-container'>
        <p>Logged in as {currentUser.email}</p>
        <div class='all-task-container'>
          <div class='new-container task-container'>
            <h2>New Tasks</h2>
            { newTasks }
          </div>
          <div class='in-progress-container task-container'>
            <h2>In-Progress Tasks</h2>
            { inProgressTasks }
          </div>
          <div class='done-container task-container'>
            <h2>Completed Tasks</h2>
            { doneTasks }
          </div>
        </div>
      </div>
    );
  }
}

export default Tasks;
