import React, { Component } from "react";
import "./css/App.css";
import Calendar from "./Calendar";
import "../node_modules/daemonite-material/js/material.min.js";

import axios from "axios";

import Column from "./Column.js";

class App extends Component {
  hierarchy = ["New", "In Progress", "Done"];
  finished = [false, false, true];
  
  loaded = false

  constructor(props) {
    super(props);

    const state = {
      archive: [],
      deleted: []
    };
    this.hierarchy.forEach(name => (state[name] = []));

    this.state = state;

    if (window.localStorage.todoList !== undefined) {
      Object.assign(this.state, JSON.parse(window.localStorage.todoList));
    }
    
    this.sessName = window.location.pathname.split("session/")[1];
    
    this.load();
  }
  load(){
    axios.post("/load", {name: this.sessName})
    .then((res) => {
      if(res.data){
        let data;
        if(typeof res.data === "string"){
          data = JSON.parse(res.data);
        }else if(typeof res.data === "object"){
          data = res.data;
        }
        
        if(data && JSON.stringify(data) !== JSON.stringify(this.state)){
          this.setState(data);
        }
      }
      this.loaded = true
    })
    .catch(console.log);
  }
  save(){
    axios.post("/save", {name: this.sessName, state: JSON.stringify(this.state)})
    .then(() => console.log("Saved"))
    .catch((err) => console.log(err.response))    
  }
  interval = null;
  componentDidMount(){
    this.interval = setInterval(() => this.load(), 5000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  render() {
    window.localStorage.todoList = JSON.stringify(this.state);
    if(this.loaded){
      this.save();
    }
    const advanceTask = (task, id, delta) => {
      const hierIndex = this.hierarchy.indexOf(id);

      const currList = this.state[this.hierarchy[hierIndex]].concat();
      currList.splice(currList.indexOf(task), 1);

      this.setState({
        [this.hierarchy[hierIndex]]: currList
      });

      const nextIndex = hierIndex + delta;
      if (nextIndex === this.hierarchy.length) {
        this.setState({
          archive: this.state.archive.concat(task)
        });
      } else if (nextIndex === -1) {
        this.setState({
          deleted: this.state.deleted.concat(task)
        });
      } else {
        const id = this.hierarchy[nextIndex];
        this.setState({
          [id]: this.state[id].concat(task)
        });
      }
    };
    const addTask = (task, id) => {
      this.setState({
        [id]: this.state[id].concat(task)
      });
    };

    let calendarTasks = [];
    this.hierarchy.forEach((arr, i) => {
      if(!this.finished[i]){
        calendarTasks = calendarTasks.concat(this.state[arr]);
      }
    });
    return (
    <div>
      <Calendar tasks={calendarTasks}/>
      <div className="row h-100 justify-content-around">
        {this.hierarchy.map((name, i) => {
          return (
            <Column
              key={name}
              col={name}
              tasks={this.state[name]}
              addTask={addTask}
              advanceTask={advanceTask}
              hasForm={i === 0}
              mobileHidden={i >= 2}
            />
          );
        })}
      </div>
    </div>
    );
  }
}

export default App;
