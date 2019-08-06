
import React, { Component } from "react";
import { Grid, Button } from 'semantic-ui-react'
import EORModalCard from "./EORModalCard" 
import EORPrizes from "./EORPrizes"



export default class EORModal extends Component {

state= {
  maxPoints: [],
  minPoints: "",
  max: "",
  min: ""
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

  render(){
   
        return(
        
     <div>
       <h1>Time's Up!</h1>
      {
        this.props.userPoints.filter(userPoint => userPoint.wheelId === this.props.wheel.id)
        .map(point => (
          <Grid.Column>
        <EORModalCard users={this.props.users} points={point} tasks={this.props.task} min={this.state.minPoints} max={this.state.maxPoints} minNum={this.state.min} maxNum={this.state.max} />
        </Grid.Column>
        ))
      }

      <h2>This Week's Prize or Prizes: </h2>

      {
      this.state.maxPoints.map(points => (
          <EORPrizes points={points} userPrizes={this.props.userPrizes} />
      ))
      }
      
      <h2>Crap Task Is: {this.props.tasks.name}</h2>
      <Button color='teal' fluid size='medium'>
          Pick New Prize
      </Button>  

      </div>


        )
  }
}




