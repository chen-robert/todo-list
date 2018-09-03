import React, { Component } from "react";
import "./css/App.css";
import Calendar from "./Calendar";
import "../node_modules/daemonite-material/js/material.min.js";

import $ from "jquery";
import axios from "axios";

import Column from "./Column.js";

class App extends Component {
  hierarchy = ["New", "In Progress", "Done"];
  finished = [false, false, true];

  undoHistory = [];
  redoHistory = [];
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

    const undo = () => {
      if (this.undoHistory.length > 0) {
        const prevState = this.undoHistory.pop();
        this.redoHistory.push(this.state);

        this.setState(prevState);
      }
    };

    const redo = () => {
      if (this.redoHistory.length > 0) {
        const nextState = this.redoHistory.pop();
        this.undoHistory.push(this.state);

        this.setState(nextState);
      }
    };

    $(document).keypress(e => {
      if (e.ctrlKey) {
        switch (e.which) {
          case 25:
            redo();
            break;
          case 26:
            undo();
            break;
        }
      }
    });
    
    this.sessName = window.location.pathname.split("session/")[1];
    
    axios.post("/load", {name: this.sessName})
    .then((res) => {
      if(res.data){
        if(typeof res.data === "string"){
          this.setState(JSON.parse(res.data));
        }else if(typeof res.data === "object"){
          this.setState(res.data);
        }
      }
    })
    .catch(console.log);
  }
  interval = null;
  componentDidMount(){
    this.interval = setInterval(() => {
      axios.post("/save", {name: this.sessName, state: JSON.stringify(this.state)})
      .then(() => console.log("Saved"))
      .catch((err) => console.log(err.response))
    }, 5000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  render() {
    window.localStorage.todoList = JSON.stringify(this.state);
    const advanceTask = (task, id, delta) => {
      saveState();

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
      saveState();

      this.setState({
        [id]: this.state[id].concat(task)
      });
    };

    const saveState = () => {
      this.undoHistory.push(this.state);
      this.redoHistory.splice(0, this.redoHistory.length);
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
