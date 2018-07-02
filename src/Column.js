import React, { Component } from 'react';
import Task from "./Task";

import $ from "jquery";

class Column extends Component{
  render(){
    let input;
    return (
      <div className="col-md-3">
        <div className="card h-50">
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
          {
            this.props.tasks.map((task, i) => {
              const _self = <Task col={this.props.col} desc={task} key={i} onClick={
                (e) => {
                  e.preventDefault();

                  this.props.advanceTask(task, this.props.col);
                }
              }/>

              return _self;
            })
          }
        </div>
      </div>
    );
  }
}

export default Column;
