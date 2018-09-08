import React, { Component } from "react";
import Task from "./Task";

import { TextField } from "@material-ui/core";
import { formatDate } from "./dateUtils";

class Column extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: "",
      date: this.getNextSchoolDay()
    };
  }
  getNextSchoolDay = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);

    while ([0, 6].indexOf(tomorrow.getDay()) !== -1) {
      tomorrow.setDate(tomorrow.getDate() + 1);
    }

    return formatDate(tomorrow);
  };
  render() {
    const spacing = { marginLeft: "3px", marginRight: "3px" };
    return (
      <div
        className={
          "col-lg-4 col-md-6 py-3 " +
          (this.props.mobileHidden ? "d-md-none d-lg-block" : "")
        }
      >
        <div className="card" style={{ maxHeight: "100%" }}>
          <div className="p-3">
            <h5 className="card-title">{this.props.col}</h5>
            {this.props.hasForm ? (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  
                  if(this.state.text.length !== 0){
                    this.props.addTask({ ...this.state }, this.props.col);
                  }

                  this.setState({ text: "" });
                }}
              >
                <div className="form-group">
                  <TextField
                    id="task-inputfield"
                    placeholder="Description"
                    label="Add Task"
                    value={this.state.text}
                    onChange={e => this.setState({ text: e.target.value })}
                    style={spacing}
                    fullWidth
                  />
                  <TextField
                    id="date"
                    label="Due Date"
                    type="date"
                    value={this.state.date}
                    onChange={e => this.setState({ date: e.target.value })}
                    InputLabelProps={{
                      shrink: true
                    }}
                    style={spacing}
                  />
                </div>
              </form>
            ) : (
              ""
            )}
          </div>
          <div className="task-container">
            {this.props.tasks.map((task, i) => {
              return (
                <Task
                  col={this.props.col}
                  desc={task.text}
                  key={i}
                  advanceTask={delta => {
                    this.props.advanceTask(task, this.props.col, delta);
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Column;
