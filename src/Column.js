import React, { Component } from 'react';
import Task from "./Task";

import $ from "jquery";

class Column extends Component{
  render(){
    let input;
    return (
      <div className={"col-lg-3 col-md-6 py-3 " + (this.props.mobileHidden ? "d-md-none d-lg-block": "")}>
        <div className="card">
          <div className="p-3">
            <h5 className="card-title">{this.props.col}</h5>
            {
              this.props.hasForm ? (
                <form onSubmit={
                  (e) => {
                    e.preventDefault();
                    this.props.addTask(input.value, this.props.col);

                    $(input).val("");
                  }
                }>
                <input className="form-control" ref={self => {input = self}} placeholder="Task description" />
                </form>
              ): ""
            }
          </div>
          <div className="task-container">
          {
            this.props.tasks.map((task, i) => {
              const _self = <Task col={this.props.col} desc={task} key={i} advanceTask={
                (delta) => {
                  this.props.advanceTask(task, this.props.col, delta);
                }
              }/>

              return _self;
            })
          }
          </div>
        </div>
      </div>
    );
  }
}

export default Column;
