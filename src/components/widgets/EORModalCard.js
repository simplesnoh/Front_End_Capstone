
import React, { Component } from "react";
import { Image } from 'semantic-ui-react' 
import poop from './poop.png'
import crown from './crown.png'

/*TODO:
-Put cute symbol in
-needs to get users & points
-Show users, show points
-needs to show icon depending on the points
   needs to take all points,find highest and lowest
    needs to find which user has each
    needs to set icon to show above corresponding user
-add okay button
-When submitted change conditional of complete on wheel and trigger re-render with modal


-filter for users with team .map over users
-display users and points
*/
export default class EORModalCard extends Component {

state= {

}

renderImage = () => {
  if(this.props.points.points === this.props.minNum ){
    return <Image src={poop} size="tiny" centered /> 
  }else if(this.props.points.points === this.props.maxNum){
    return <Image src={crown} size="tiny" centered /> 
  }
  else{
    return 
  }
}

  render(){

        return(
        
          <React.Fragment>
        {
              this.props.users.filter(user => user.id === this.props.points.userId)
              .map(user => 
                <React.Fragment>
                  <div className="image" >
                  {
                    this.renderImage()
                  }
                  </div>
                <Image src={this.renderImage} size="tiny" centered /> 
                <Image src={user.photoUrl} size="tiny" circular centered />  
                <div>{this.props.points.points}</div>
                </React.Fragment>
              )
              
          }
     </React.Fragment>


        )
  }
}
