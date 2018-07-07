import React, { Component } from 'react';
import './App.css';

import Column from "./Column.js";

class App extends Component {
  hierarchy = ["New", "In Progress", "Done"];
  constructor(props){
    super(props);

    const state = {};
    state.archive = [];
    this.hierarchy.forEach((name) => state[name] = []);

    this.state = state;

    if(window.localStorage.todoList !== undefined){
      Object.assign(this.state, JSON.parse(window.localStorage.todoList));
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
      }else{
        this.setState({
          archive: this.state.archive.concat(task)
        });
      }
    }
    const addTask = (task, id) => {
      this.setState({
        [id]: this.state[id].concat(task)
      });
    }

    return (
      <div className="row h-100 justify-content-around">
          {
              this.hierarchy.map((name, i) => {
                return <Column key={name} col={name} tasks={this.state[name]} addTask={addTask} advanceTask={advanceTask} hasForm={i === 0} mobileHidden={i >= 2}/>
              })
          }
      </div>
    );
  }
}

export default App;
