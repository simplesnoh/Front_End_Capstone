
import React, { Component } from "react";
import { Grid, Button, Modal } from 'semantic-ui-react'
import TeamEORModalCard from "./TeamEORModalCard" 
import TeamEORPrizes from "./TeamEORPrizes"
import TeamNewPrize from '../widgets/TeamNewPrize'



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
};

handleClose = () => {
    this.setState({ open: false })
    this.props.handleFirstClose()
  };




  render(){
   
        return(
        
     <div>
       <h1>Time's Up!</h1>
      {
        this.props.userPoints.filter(userPoint => userPoint.wheelId === this.props.wheel.id)
        .map(point => (
          <Grid.Column>
        <TeamEORModalCard users={this.props.users} points={point} tasks={this.props.task} min={this.state.minPoints} max={this.state.maxPoints} minNum={this.state.min} maxNum={this.state.max} />
        </Grid.Column>
        ))
      }

      <h2>This Week's Prize or Prizes: </h2>

      {
      this.state.maxPoints.map(points => (
          <TeamEORPrizes points={points} userPrizes={this.props.userPrizes} tasks={this.props.tasks} />
      ))
      }
      
      <h2>Crap Task Is: {this.props.tasks.name}</h2>
      

      <Modal trigger={<Button color='teal' fluid size='medium' onClick={this.handleOpen}> Pick New Prize</Button>  } open={this.state.open} >
      {
        this.props.userPrizes.filter(prize => prize.wheelId === this.props.wheel.wheelId)
        .filter(prize => prize.userId === sessionStorage.getItem('team'))
        .map( prize => 
      <TeamNewPrize users={this.props.users} userPrize={prize} updateAPI={this.props.updateAPI} handleClose={this.handleClose} addToAPI={this.props.addToAPI} tasks={this.props.allTasks} userPoints={this.props.userPoints} />
        )
      }
      </Modal>

      </div>


        )
  }
}