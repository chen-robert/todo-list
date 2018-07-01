import React, { Component } from 'react';
import Task from "./Task";

import $ from "jquery";

class Column extends Component{
  render(){
    let input;
    return (
      <div class="col-md-4">
        <div class="card">
          <div class="card-body">
            {this.props.tasks}
            <form onSubmit={
              (e) => {
                e.preventDefault();
                this.props.addTask(input.value, this.props.col);

                $(input).val("");
              }
            }>
              <input className="form-control" ref={self => {input = self}} />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Column;
