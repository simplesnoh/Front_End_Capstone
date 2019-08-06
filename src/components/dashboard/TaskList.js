import React, { Component } from "react";
import { List } from 'semantic-ui-react'



export default class TaskList extends Component{

  state = {  
   show: true,
   done: ""
  };


  handleTask = (task) => {
    const thisTask = {
        name: task.name,
        completed: true,
        userId: task.userId,
        ownerId: task.ownerId,
        taskTypeId: task.taskTypeId,
        teamId: task.teamId,
        id: task.id
    }
    console.log("task", thisTask)
    this.props.updateAPI(thisTask, "tasks")
    .then(()=> {
        let allPoints = this.props.userPoints.filter(points => points.wheelId === this.props.wheel.id )
        let yourPoints = allPoints.filter(points => points.userId === sessionStorage.getItem('team'))
        const userPoints = {
            teamId: yourPoints[0].teamId,
            wheelId: yourPoints[0].wheelId,
            userId:yourPoints[0].userId,
            points: yourPoints[0].points + 10,
            id: yourPoints[0].id
        }
        return userPoints
    })
    .then((userPoints)=> this.props.updateAPI(userPoints, "userPoints"))
    .then(() => {
        this.setState({ show:false })
        this.setState({ done:true })
    })
  }

  

  render(){
      
        return(
            <React.Fragment>
                 <List key={this.props.task.id} divided relaxed >
                    <List.Item>
                       
                    <div className= {this.props.task.completed === true? '': 'hide'}>+10</div>
                    <div className= {this.props.task.completed === true? 'hide': ''}><List.Icon name='check square outline' size='large' verticalAlign='middle' onClick={() => this.handleTask(this.props.task)} /> </div>
                        
                    <List.Content>
                        <List.Header >{this.props.task.name}</List.Header>
                    </List.Content>
                    </List.Item>
                    </List>
            </React.Fragment>
        )
        }
    }
