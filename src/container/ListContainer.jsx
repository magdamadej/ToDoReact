import React, { Component } from 'react';
import AddTask from '../component/AddTask';
import TaskList from '../component/TaskList';
import axios from 'axios';

class ListContainer extends Component {

  counter = 2

  state = {
    tasks: [
    ]
  }


  getData() {
    axios.get("http://195.181.210.249:3000/todo/")
      .then(res => {
        this.setState({ tasks: res.data });
      })
  }
  componentDidMount() {
    this.getData();
  }

  deleteTask = (id) => {

    let tasks = this.state.tasks;
    let delEl = tasks.filter(el => el.id !== id);
    axios.delete("http://195.181.210.249:3000/todo/" + id, {});
    this.setState({
      tasks: delEl
    });
  }

  changeTaskStatus = (id) => {
    const tasks = Array.from(this.state.tasks);
    tasks.forEach(task => {
      if (task.id === id) {
        task.active = false; //zmiana właściwości na kopii tablicy
        task.finishDate = new Date().getTime()
      }
    })
    this.setState({
      tasks
    })
  }

  addTask = (task) => {
    axios.post("http://195.181.210.249:3000/todo/", {
      title: task,
      author: "Magda",
    })
      .then(() => this.getData());
  }

  render() {
    return (
      <div className="App">
        <div className="ContainerApp">
          <AddTask add={this.addTask} />
          <TaskList tasks={this.state.tasks} delete={this.deleteTask} change={this.changeTaskStatus} />

        </div>
      </div>
    );
  }
}

export default ListContainer;


