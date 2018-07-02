import React, { Component } from 'react';
import { CSSTransitionGroup } from 'react-transition-group'

class Task extends Component{
  render(){
    return (
      <CSSTransitionGroup transitionName="task" transitionAppearTimeout={700} 
      transitionAppear={true}>
        <div className="task" onClick={this.props.onClick}>
          <p>{this.props.desc}</p>
        </div>
      </CSSTransitionGroup>
    );


  }
}

export default Task;
