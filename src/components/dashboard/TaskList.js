import React, { Component } from "react";
import { List } from 'semantic-ui-react'



export default class TaskList extends Component{

  state = {  
   show: true,
   done: false
  };

  /*
  handleTask = () => {}
  update task as completed
  map through user points based off userId
  update user points with added points
  */

  handleTask = () => {
    const task = {
        name: this.task.name,
        completed: true,
        ownerId: this.task.ownerId,
        taskTypeId: this.task.taskTypeId,
        teamId: this.task.teamId,
        id: this.task.id
    }
    this.props.updateAPI(task, "tasks")
    .then(()=> {
        let allPoints = this.props.userPoints.filter(points => points.wheelId === this.props.wheel.id )
        let yourPoints = allPoints.filter(points => points.userId === sessionStorage.getItem('team'))
        const userPoints = {
            teamId: yourPoints[0].teamId,
            wheelId: yourPoints[0].wheelId,
            userId:yourPoints[0].userId,
            points: userPoints[0].points + 10,
            id: userPoints[0].id
        }
        console.log(userPoints)
    })
  }

 

  render(){

    if(this.props.task.completed === true){
        this.setState({ done : false })
        this.setState({ show : true })
    }
      
        return(
            <React.Fragment>
            {
                this.props.task.filter(task => task.userId === sessionStorage.getItem('team'))
                .map(task => {
                   return <List key={task.id} divided relaxed >
                    <List.Item>
                    <div className= {this.state.show ? 'hide': ""}>+10</div>
                    <div className={this.state.done ? 'hide': ""}><List.Icon name='check square outline' size='large' verticalAlign='middle' /></div>
                    <List.Content>
                        <List.Header >{task.name}</List.Header>
                    </List.Content>
                    </List.Item>
                    </List>
                })
            }
            </React.Fragment>
        )
  }
}