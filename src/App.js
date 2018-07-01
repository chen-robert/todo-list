import React, { Component } from 'react';
import './App.css';

import Task from "./Task.js";
import Column from "./Column.js";

class App extends Component {
  constructor(props){
    super(props);

    this.state = {
      counter: 0,
      new: [],
      prog: [],
      done: [],
    }
  }
  addOneAndReturn(){
    this.setState({
      counter: this.state.counter + 1,
    });
    return this.state.counter;
  }
  render() {
    const addTask = (task, id) => {
      this.setState({
        [id]: this.state[id].concat(
          <Task desc={task} key={this.addOneAndReturn()}/>
        )
      });
    }


    return (
      <div class="row">
        <Column col="new" name="HI" tasks={this.state.new} addTask={addTask}/>
        <Column col="prog" name="HI"/>
        <Column col="done" name="HIs"/>
      </div>
    );
  }
}

export default App;
