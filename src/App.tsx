import React from 'react';
import './App.css';
import TaskModel from './TaskModel';
import Table from './Table';
import Form from './Form';
import Filter from './Filter';

interface ToDoAppProps {};
interface ToDoAppState {
  tasks: TaskModel[],
  newTaskId: number,
  filter: string,
  addTask: boolean
};
class ToDoApp extends React.Component <ToDoAppProps, ToDoAppState> {
  constructor(props: ToDoAppProps) {
    super(props);
    this.state = {
      tasks: [],
      newTaskId: 1,
      filter: 'all',
      addTask: false
    }
  }
  handleAdd = (employeeName: string, taskType: string, taskDescription: string) => {
    let tasks = this.state.tasks;
    let newTaskId = this.state.newTaskId;
    let task = {
      id: newTaskId,
      employeeName: employeeName,
      taskType: taskType,
      taskDescription: taskDescription,
      time: Date.now()
    };
    newTaskId += 1;
    tasks.push(task);
    this.setState({tasks: tasks, newTaskId: newTaskId, addTask: false});
  }
  handleUpdate = (id: number, employeeName: string, taskType: string, taskDescription: string) => {
    let updatedTasks = this.state.tasks.map(task => {
      if (task.id === id) {
        task.employeeName = employeeName;
        task.taskType = taskType;
        task.taskDescription = taskDescription;
        task.time = Date.now();
      }
      return task;
    });
    this.setState({
      tasks: updatedTasks
    });
  }
  handleDelete = (id: number) => {
    let tasks = this.state.tasks;
    let updatedList = tasks.filter(task => {
      return task.id !== id;
    });
    this.setState({
      tasks: updatedList
    });
  }
  handleFilter = (filterValue: string) => {
    this.setState({
      filter: filterValue
    });
  }
  handleClickAddButton = () => {
    this.setState({
      addTask: true
    });
  }
  render() {
    return (
      <div className='container'>
        <div>
          <div><h1>Employee TODO List</h1></div>
          <div style={{float:'right', marginRight: 90}}><Filter filter={this.state.filter} handleFilter={this.handleFilter} /></div>
        </div>
        { this.state.addTask ? <div><Form handleAdd={this.handleAdd} /></div> : <button type='button' onClick={this.handleClickAddButton}>+</button>}
        <br/>
        <Table
          tasks={this.state.tasks}
          newTaskId={this.state.newTaskId}
          filter={this.state.filter}
          handleUpdate={this.handleUpdate}
          handleDelete={this.handleDelete} />
      </div>
    );
  }
}
export default ToDoApp;
