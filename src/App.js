import React, { Component } from 'react';
import './App.css';

import Task from "./Task.js";
import Column from "./Column.js";

class App extends Component {
  hierarchy = ["New", "In Progress", "Done"];
  constructor(props){
    super(props);

    const state = {
      counter: 0,
    }

    this.hierarchy.forEach((name) => state[name] = []);

    this.state = state;

  }
  addOneAndReturn(){
    this.setState({
      counter: this.state.counter + 1,
    });
    return this.state.counter;
  }
  render() {
    const addTask = (task, id) => {
      const hierIndex = this.hierarchy.indexOf(id);

      const taskElement = <Task col={id} desc={task} key={this.addOneAndReturn()} onClick={
        (e) => {
          e.preventDefault();

          if(hierIndex !== this.hierarchy.length - 1){
            const currList = this.state[this.hierarchy[hierIndex]].concat();
            currList.splice(currList.indexOf(taskElement), 1);

            this.setState({
              [this.hierarchy[hierIndex]]: currList,
            });

            addTask(task, this.hierarchy[hierIndex + 1]);
          }
        }
      }/>
      this.setState({
        [id]: this.state[id].concat(taskElement)
      });
    }


    return (
      <div className="row">
          {
              this.hierarchy.map((name) => {
                return <Column key={name} col={name} tasks={this.state[name]} addTask={addTask}/>
              })
          }
      </div>
    );
  }
}

export default App;
