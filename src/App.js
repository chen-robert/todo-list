import React, { Component } from 'react';
import './App.css';

import Task from "./Task.js";
import Column from "./Column.js";

class App extends Component {
  hierarchy = ["New", "In Progress", "Done"];
  constructor(props){
    super(props);

    this.state = {}
    this.hierarchy.forEach((name) => this.state[name] = []);

    if(window.localStorage.todoList !== undefined){
      this.state = JSON.parse(window.localStorage.todoList);
    }
  }
  render() {
    window.localStorage.todoList = JSON.stringify(this.state);

    const advanceTask = (task, id) => {
      const hierIndex = this.hierarchy.indexOf(id);

      const currList = this.state[this.hierarchy[hierIndex]].concat();
      currList.splice(currList.indexOf(task), 1);

      this.setState({
        [this.hierarchy[hierIndex]]: currList,
      });

      if(hierIndex !== this.hierarchy.length - 1){
        addTask(task, this.hierarchy[hierIndex + 1]);
      }
    }
    const addTask = (task, id) => {
      this.setState({
        [id]: this.state[id].concat(task)
      });
    }


    return (
      <div className="row h-100">
          {
              this.hierarchy.map((name) => {
                return <Column key={name} col={name} tasks={this.state[name]} addTask={addTask} advanceTask={advanceTask}/>
              })
          }
      </div>
    );
  }
}

export default App;
