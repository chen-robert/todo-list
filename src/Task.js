import React, { Component } from "react";
import { CSSTransitionGroup } from "react-transition-group";

class Task extends Component {
  render() {
    const onClick = (e, delta) => {
      e.preventDefault();

      this.props.advanceTask(delta);
    };

    return (
      <CSSTransitionGroup
        transitionName="task"
        transitionAppearTimeout={700}
        transitionAppear={true}
        transitionEnterTimeout={700}
        transitionLeaveTimeout={700}
      >
        <div className="task p-4">
          <p>{this.props.desc}</p>
          <div
            className="inline-task-button move-back"
            onClick={e => onClick(e, -1)}
          />
          <div
            className="inline-task-button move-forward"
            onClick={e => onClick(e, 1)}
          />
        </div>
      </CSSTransitionGroup>
    );
  }
}

export default Task;
