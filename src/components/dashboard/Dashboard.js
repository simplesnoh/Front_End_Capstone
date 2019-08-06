import React, { Component } from "react";
import { Button, Grid, Segment } from 'semantic-ui-react' /*SN*/
import TaskList from './TaskList'
import UserPoints from './UserPoints'
import NewPrize from '../widgets/NewPrize'
import EORModal from "../widgets/EORModal"

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
   
  };



  render(){

        return(
        
     <div>
       <div>
          {
            this.props.task.filter(task => task.taskTypeId === 3)
            .map(task => (
            <EORModal users={this.props.users} userPoints={this.props.userPoints} userPrizes={this.props.userPrize} tasks={task} wheel={this.props.wheel} />
            ))
          }

              {/* {
                this.props.userPrize.filter(prize => prize.wheelId === this.props.wheel.wheelId)
                .filter(prize => prize.userId === sessionStorage.getItem('team'))
                .map( prize => 
              <NewPrize userPrize={prize} updateAPI={this.props.updateAPI} />
                )
              } */}
        
           </div>
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
      <Button color='teal' fluid size='medium'>
          Stop Round!
      </Button>    
  
      </div>
      </div>
        )
            }
  }

