
import React, { Component } from "react";
import { Image } from 'semantic-ui-react' 


export default class TeamEORPrize extends Component {

state= {

}

  render(){

        return(
        
    <div>
        {
              this.props.userPrizes.filter(userPrize => userPrize.userId === this.props.points.userId)
              .map(userPrize => 
                <h4>{userPrize.prize}</h4>
              )
              
          }
    </div>


        )
  }
}