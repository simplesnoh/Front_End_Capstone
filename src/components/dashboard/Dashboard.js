import React, { Component } from "react";
import { Button, Grid, Segment, Modal } from 'semantic-ui-react' /*SN*/
import TaskList from './TaskList'
import UserPoints from './UserPoints'
import EORModal from "../widgets/EORModal"
import TeamEORModal from "../widgets/TeamEORModal"
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
   open: false,
   endModal: true,
  };

  handleOpen = () => {
    this.setState({ open: true })
  };

  handleFirstClose = () => {
      this.setState({ open: false })
    };



  render(){
    console.log(this.props.wheel)
    if (this.props.wheel !== undefined){
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
        <EORModal users={this.props.users} userPoints={this.props.userPoints} addToAPI={this.props.addToAPI} userPrizes={this.props.userPrize} tasks={task} allTasks={this.props.task} wheel={this.props.wheel} updateAPI={this.props.updateAPI} handleFirstClose={this.handleFirstClose} team={this.props.team} getNewWheel={this.props.getNewWheel} />
        ))
      }
    </Modal>

      {
        this.props.wheel.gameEnded === true ?
        <Modal open={this.state.endModal}>
        {
          this.props.task.filter(task => task.taskTypeId === 3)
          .map(task => (
          <TeamEORModal users={this.props.users} userPoints={this.props.userPoints} addToAPI={this.props.addToAPI} userPrizes={this.props.userPrize} tasks={task} allTasks={this.props.task} wheel={this.props.wheel} updateAPI={this.props.updateAPI} handleFirstClose={this.handleFirstClose} team={this.props.team} getNewWheel={this.props.getNewWheel} />
          ))
        }
      </Modal>
          : <div></div>
      }
      
  
      </div>
        )
            } 
          else {return (
          <div> why </div>)}}
            
  }

