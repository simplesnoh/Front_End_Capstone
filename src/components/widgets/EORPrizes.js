
import React, { Component } from "react";
import { Image } from 'semantic-ui-react' 


export default class EORPrizes extends Component {

state= {

}

  render(){

        return(
        
    <div>
        {
              this.props.userPrizes.filter(userPrize => userPrize.userId === this.props.points.userId)
              .map(userPrize => 
                <h2>{userPrize.prize}</h2>
              )
              
          }
    </div>


        )
  }
}