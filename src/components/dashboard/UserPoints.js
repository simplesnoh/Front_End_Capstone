import React, { Component } from "react";
import { Label } from 'semantic-ui-react' 
import ProgressBar from './ProgressBar'


export default class UserPoints extends Component {

  render(){

        return(
        
      <React.Fragment>
          {
              this.props.users.filter(user => user.id === this.props.points.userId)
              .map(user => 
                <div key={user.id} >
                <Label>{user.username}</Label>
   
                <ProgressBar task={this.props.tasks} allUsers={this.props.users} points={this.props.points} user={user} wheel={this.props.wheel} />
  
                 <div>{this.props.points.points}</div>
                 </div>
              )
              
          }
     </React.Fragment>
        )
   
    }
  }
