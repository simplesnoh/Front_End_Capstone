import React, { Component } from "react";
import { Button, Grid, Segment } from 'semantic-ui-react' /*SN*/
import TaskList from './TaskList'

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
        <Grid>
          <Grid.Column>
            <Segment>
               <TaskList task={this.props.task} userPoints={this.props.userPoints} wheel={this.props.wheel} updateAPI={this.updateAPI}/>
                

{/* FIXME: Conditionally render this button for only the team owner */}

      <Button color='teal' fluid size='medium'>
          Stop Round!
      </Button>
      </Segment>
      </Grid.Column>
      </Grid>
      </div>


        )
  }
}
