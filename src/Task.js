import React, { Component } from 'react';

class Task extends Component{
  render(){
    return (
      <div>
        <p>{this.props.desc}</p>
      </div>
    );


  }
}

export default Task;
