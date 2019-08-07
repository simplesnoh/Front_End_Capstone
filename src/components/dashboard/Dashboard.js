import React, { Component } from "react";
import { Button, Grid, Segment, Modal } from 'semantic-ui-react' /*SN*/
import TaskList from './TaskList'
import UserPoints from './UserPoints'
import EORModal from "../widgets/EORModal"
// import APIManager from '../modules/APIManager'

/*TODO:
-link to file to make wheel, pass in tasks
-Need to figure out how to show who has what tasks on wheel
-Maybe make another wheel but with images, use css to layer them
-Need to get your team's users
-link to user points component, pass in your team's users (userPoints/tasks through users/)
-Link to taskList component pass in your tasks
*/

export default class Dashboard extends Component {

  state = {  
   open: false
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleFirstClose = () => {
      this.setState({ open: false })
    };

/*
componentDidMount() => {
  I need users
  I need non crap tasks
  let taskList = this.props.task.filter(task => task.taskTypeId === 2)
  let userPoints = this.props.userPoints.filter(points => points.teamId === sessionStorage.getItem('teamId'))
  let userList = []
  userPoints.forEach(task => {
    let users = this.props.users.filter(user => user.id === userPoints.ownerId)
    userList.push(users)
  })
 let numGroups = userList.length
 tasksPerGroup = taskList.length / numGroups
 userList.forEach(user => {
   for(i=0; i < namesPerGroup; i++){
     randomTask = Math.floor(Math.random()*taskList.length)
     if(taskList[randomTask]){
      APIManager.getTaskByName(taskList[randomTask], this.props.wheel.Id)
      .then(task => {
        const addUserId {
          name: task.name,
          completed: task.completed,
          userId: user.id,
          ownerId: task.ownerId,
          taskTypeId: task.taskTypeId,
          teamId: task.teamId,
          wheelId: task.wheelId,
          id: task.id
        }
        this.props.updateAPI(addUserId, 'tasks'))
        .then(() => taskList.splice(randomTask, 1))
      })
     }
   }
 })
}
*/


  render(){

    console.log(this.props.wheel)

        return(
           <div>
            <Segment>
              {
              this.props.userPoints.filter(userPoint => userPoint.wheelId === this.props.wheel.id)
              .map(point => (
                <UserPoints users={this.props.users} points={point} tasks={this.props.task} />
              ))
            }
            </Segment>

            <Segment>
              {
                this.props.task.filter(task => task.userId === sessionStorage.getItem('team'))
                .map(task => <TaskList task={task} userPoints={this.props.userPoints} wheel={this.props.wheel} updateAPI={this.props.updateAPI}/>)
              }
{/* FIXME: Conditionally render this button for only the team owner */}

      
      </Segment>

      <Modal trigger={<Button color='teal' fluid size='medium' onClick={this.handleOpen} >Stop Round!</Button>} open={this.state.open} >
      {
        this.props.task.filter(task => task.taskTypeId === 3)
        .map(task => (
        <EORModal users={this.props.users} userPoints={this.props.userPoints} addToAPI={this.props.addToAPI} userPrizes={this.props.userPrize} tasks={task} allTasks={this.props.task} wheel={this.props.wheel} updateAPI={this.props.updateAPI} handleFirstClose={this.handleFirstClose} />
        ))
      }
    </Modal>

      
  
      </div>
        )
            }
  }

