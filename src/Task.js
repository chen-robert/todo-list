import React, { Component } from 'react';

class Task extends Component{
  render(){
    return (
      <div onClick={this.props.onClick}>
        <p>{this.props.desc}</p>
      </div>
    );


  }
}

export default Task;
