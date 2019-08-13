import React, { Component } from "react";
import { Progress } from "semantic-ui-react";

export default class ProgressBar extends Component {

  calculateProgress = () => {
    let yourTaskList = this.props.task.filter(
      task => task.userId === this.props.user.id
    );
    let doneTasks = yourTaskList.filter(task => task.completed === true);
    let splitNum = 100 / yourTaskList.length;
    let percentage = doneTasks.length * splitNum;
    return percentage;
  };

  render() {

    let percent = this.calculateProgress()

    return (
      <div>
        <Progress percent={percent} indicating />
      </div>
    );
  }
}
