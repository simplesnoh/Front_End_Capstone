
import React, { Component } from "react";



export default class EORPrizes extends Component {

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