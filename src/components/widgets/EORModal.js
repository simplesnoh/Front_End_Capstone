
import React, { Component } from "react";
import { Grid, Button, Modal } from 'semantic-ui-react'
import EORModalCard from "./EORModalCard" 
import EORPrizes from "./EORPrizes"
import NewPrize from '../widgets/NewPrize'



export default class EORModal extends Component {

state= {
  maxPoints: [],
  minPoints: "",
  max: "",
  min: "",
  open: false
}

componentDidMount(){
  let teamPoints = this.props.userPoints.filter(userPoint => userPoint.wheelId === this.props.wheel.id)
  let max = Math.max.apply(Math,teamPoints.map(function(o){return o.points;}))
  let min = Math.min.apply(Math,teamPoints.map(function(o){return o.points;}))
  this.setState({ max: max })
  this.setState({ min: min })
  let maxPoints = teamPoints.filter(point => point.points === max)
  let minPoints = teamPoints.filter(point => point.points === min)
  this.setState({ maxPoints: maxPoints })
  this.setState({ minPoints: minPoints })
  
}

handleOpen = () => {
  this.setState({ open: true })
  const updatedWheel = 
   {
    id: this.props.wheel.id,
    completed: this.props.wheel.completed,
    gameEnded: true,
    ownerId: this.props.wheel.ownerId,
    teamId: this.props.wheel.teamId
  }
  this.props.updateAPI(updatedWheel, 'wheel')
  .then(()=> {
    const newWheel = {
    completed: false,
    teamId: +sessionStorage.getItem('teamId'),
    ownerId: sessionStorage.getItem('team'),
    gameEnded: false
  }
  this.props.addToAPI(newWheel, 'wheel')
})
};

handleClose = () => {
    this.setState({ open: false })
    this.props.handleFirstClose()
  };




  render(){
   
        return(
        
      <React.Fragment>
       <Grid divided='vertically'>
       <h1>Time's Up!</h1>
       <Grid.Row columns={5}>
       
      {
        this.props.userPoints.filter(userPoint => userPoint.wheelId === this.props.wheel.id)
        .map(point => (
        <Grid.Column>
        <EORModalCard users={this.props.users} points={point} tasks={this.props.task} min={this.state.minPoints} max={this.state.maxPoints} minNum={this.state.min} maxNum={this.state.max} />
        </Grid.Column>
        ))
      }
      </Grid.Row>
      </Grid>

     
      <h2>This Week's Prize or Prizes: </h2>

      {
      this.state.maxPoints.map(points => (
          <EORPrizes points={points} userPrizes={this.props.userPrizes} tasks={this.props.tasks} />
      ))
      }
      
      <h2>Crap Task Is: {this.props.tasks.name}</h2>
      

      <Modal trigger={<Button color='teal' fluid size='medium' onClick={this.handleOpen}> Pick New Prize</Button>  } open={this.state.open} >
      {
        this.props.userPrizes.filter(prize => prize.wheelId === this.props.wheel.wheelId)
        .filter(prize => prize.userId === sessionStorage.getItem('team'))
        .map( prize => 
      <NewPrize userPrize={prize} updateAPI={this.props.updateAPI} handleClose={this.handleClose} addToAPI={this.props.addToAPI} tasks={this.props.allTasks} wheel={this.props.wheel} />
        )
      }
      </Modal>
      </React.Fragment>


        )
  }
}

{/* <Grid.Row columns={3}>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
      <Grid.Column>
        <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
      </Grid.Column>
    </Grid.Row>
  </Grid> */}



