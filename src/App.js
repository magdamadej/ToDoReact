import React, { Component } from 'react';
import './App.css';
import AddTask from '../src/component/AddTask';
import TaskList from '../src/component/TaskList';
import axios from 'axios';
// import ListContainer from './container/ListContainer';

class App extends Component {

  counter = 2

  state = {
    //wszystkie zadania znajdują się w tablicy, a pojedyncze zadanie będzie osobnym obiektem
    tasks: [
      // {
      //   id: 0,
      //   text: 'Zrobić pranie',
      //   date: '2019-02-15',
      //   important: false,
      //   active: true,
      //   finishDate: null
      // },
      // {
      //   id: 1,
      //   text: 'Kupić bilety na samolot',
      //   date: '2019-02-15',
      //   important: true,
      //   active: true,
      //   finishDate: null
      // },
    ]
  }

  // componentDidMount() {
  //   axios.get('http://195.181.210.249:3000/todo/')
  //     .then(res => {
  //       this.setState({ tasks: res.data });
  //     })
  // }


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

    const tasks = [...this.state.tasks]; //kopia  tablicy
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1); //usuwanie 

    this.setState({
      tasks
    })
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

  addTask = (text, date, important) => {

    const task = {
      id: this.counter,
      text: text,
      date: date,
      important: important,
      active: true,
      finishDate: null
    }
    this.counter++
    this.setState(prevState => ({
      tasks: [...prevState.tasks, task] //nowa tablica
    }))
    return true
  }

  render() {
    return (
      <div className="App">
        <div className="ContainerApp">

          <AddTask add={this.addTask} />

          {this.state.tasks.map(el =>
            <TaskList key={el.id} tasks={this.state.tasks} delete={this.deleteTask} change={this.changeTaskStatus} />


          )}
        </div>
      </div>
    );
  }
}

export default App;