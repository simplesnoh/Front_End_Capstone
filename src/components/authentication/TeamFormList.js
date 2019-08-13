import React, { Component } from "react"
import { List } from "semantic-ui-react";
import TeamEditForm from './TeamEditForm'


/*TODO: TASK DIVS
-add one large div
-send in each of the tasks as you add them
-Order them by group number
-Show Group number on task
-Add edit and delete function on each

*/

export default class TeamForm extends Component {
 

    render() {
        return (
            <React.Fragment>
            <List divided relaxed >
              {
                  this.props.tasks.filter(task => task.teamId === this.props.teams.id)
           .map(task =>
            
                <List.Item key={task.id} >

                
                    <TeamEditForm key={task.id} task={task} updateAPI={this.props.updateAPI} handleClose={this.handleClose} {...this.props}/>
                

                <List.Icon name='trash alternate outline' verticalAlign='middle' onClick={() => this.props.deleteFromAPI(task.id,"tasks")}/>
                <List.Content>
                    <List.Header>{task.name}</List.Header>
                </List.Content>
                </List.Item>
           )
          }
          </List>
          </React.Fragment>
        )
    }
}