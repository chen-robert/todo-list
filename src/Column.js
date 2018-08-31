import React, { Component } from "react";
import Task from "./Task";

import $ from "jquery";
import { TextField } from "@material-ui/core";

class Column extends Component {
  render() {
    const formatDate = (date) => {
      let day = date.getDate();
      let month = date.getMonth() + 1;
      const year = date.getFullYear();

      if (day < 10) day = "0" + day;
      if (month < 10) month = "0" + month;

      return `${year}-${month}-${day}`;
    }
    const getNextSchoolDay = () => {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      while ([0, 6].indexOf(tomorrow.getDay()) !== -1) {
        tomorrow.setDate(tomorrow.getDate() + 1);
      }

      return formatDate(tomorrow);
    };
    let input;
    return (
      <div
        className={
          "col-lg-3 col-md-6 py-3 " +
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
                  this.props.addTask({
                    text: input.value,
                    date: formatDate(new Date())
                  }, this.props.col);

                  $(input).val("");
                  $(input).change();
                }}
              >
                <div className="form-group">
                  <div className="floating-label">
                    <label htmlFor="task-inputfield">Task Description</label>
                    <input
                      className="form-control"
                      id="task-inputfield"
                      placeholder="Task Description"
                      type="text"
                      ref={self => {
                        input = self;
                      }}
                    />
                  </div>
                </div>
                <TextField
                  id="date"
                  label="Due Date"
                  type="date"
                  defaultValue={getNextSchoolDay()}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
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
                  desc={task.text || task}
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
