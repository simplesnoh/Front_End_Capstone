
import React, { Component } from "react";
import { Modal, Header, Button } from 'semantic-ui-react'



export default class PleaseWait extends Component {


handleOpen = () => {
  this.setState({ open: true })
  };

// handleClose = () => {
//     this.props.handleClose()
//   };




  render(){
   
        return(
        
            <React.Fragment>
            <Modal.Header>One Moment Please...</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>We are waiting for your teammates!</Header>
                <p>This will close automatically once your teammates have finished choosing their prizes</p>
                <p>Once everyone is ready then the game will begin!</p>
              </Modal.Description>
            </Modal.Content>
            <Button onClick={this.props.handleClose}>Close</Button>
            </React.Fragment>
     
        )
        }
    }

