import React, { Component } from "react";
import { Segment } from 'semantic-ui-react' /*SN*/
import TaskList from './TaskList'

/*TODO:
-link to file to make wheel, pass in tasks
-Need to figure out how to show who has what tasks on wheel
-Maybe make another wheel but with images, use css to layer them
-Need to get your team's users
-link to user points component, pass in your team's users (userPoints/tasks through users/)
-Link to taskList component pass in your tasks
*/

export default class Dashboard extends Component{

  state = {  
   
  };


  render(){

    console.log("task", this.props.task)

        return(
      
      <div>
        <TaskList />
      </div>


        )
  }
}
