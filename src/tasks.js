import React, { Component } from 'react';
import './style.css';
import firebase from 'firebase';
import TaskApp from './index'

const statusToTaskClassMap = {
  0 : 'new-task-item',
  1 : 'in-progress-task-item',
  2 : 'done-task-item'
};

const containerClassToStatus = {
  'new-container' : 0,
  'in-progress-container' : 1,
  'done-container' : 2
};

class Tasks extends Component {
  constructor(props) {
    super(props);
    this.tasks = {};
    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/tasks').once('value', snapshot => {
      this.tasks = snapshot.val();
      this.forceUpdate();
    }, error => {
      alert('An error ocurred: ' + error.message);
    });
  }
  onDrop(event) {
    event.preventDefault();
    const element = document.getElementById(event.dataTransfer.getData('text'));
    if (element && event.target.classList.contains('task-container')) {
      element.classList.remove(statusToTaskClassMap[containerClassToStatus[element.parentElement.id]]);
      event.target.appendChild(element);
      element.classList.add(statusToTaskClassMap[containerClassToStatus[element.parentElement.id]]);
      firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/tasks/' + element.id + '/status').set(
        containerClassToStatus[element.parentElement.id]
      , error => {
          if (error) {
              alert('An error ocurred: ' + error.message);
          }
      });
    }
  }
  onDragStart(event) {
    event.dataTransfer.setData('text', event.target.id);
  }
  onDragOver(event) {
    event.preventDefault();
  }
  render() {
    const newTaskButton = 
    <button className='new-task-button' onClick={() => TaskApp.renderNewTaskForm()}>
      Create New Task
    </button>;
    if (this.tasks !== null) {
      const currentUser = firebase.auth().currentUser;
      const tasks = [[], [], []];
      for (const id in this.tasks) {
        tasks[this.tasks[id]['status']].push(
          <div key={id} id={id} draggable='true' onDragStart={this.onDragStart} className={'task-item ' + statusToTaskClassMap[this.tasks[id]['status']]}><p>{this.tasks[id]['name']}</p></div>
        );
      }
      return (
        <div id='tasks-container'>
          <div className='tasks-top-bar'>
            <p>Logged in as {currentUser.email}</p>
            <button type='button' onClick={() => firebase.auth().signOut()}>Sign Out</button>
          </div>
          <hr />
          <div className='all-task-container'>
            <div id='new-container' className='task-container' onDrop={this.onDrop} onDragOver={this.onDragOver}>
              <h2>New Tasks</h2>
              { tasks[0] }
            </div>
            <div id='in-progress-container' className='task-container' onDrop={this.onDrop} onDragOver={this.onDragOver}>
              <h2>In-Progress Tasks</h2>
              { tasks[1] }
            </div>
            <div id='done-container' className='task-container' onDrop={this.onDrop} onDragOver={this.onDragOver}>
              <h2>Completed Tasks</h2>
              { tasks[2] }
            </div>
          </div>
          { newTaskButton }
        </div>
      );
    } else {
      return (
        { newTaskButton }
      );
    }
  }
}

export default Tasks;
