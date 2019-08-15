
import React, { Component } from "react";
import { Modal, Header, Button } from 'semantic-ui-react'



export default class CancelModal extends Component {


handleYes = () => {
    
}


handleOpen = () => {
  this.setState({ open: true })
  };

  render(){
   
        return(
        
            <React.Fragment>
            <Modal.Header>Are You Sure?</Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <Header>Think about it. Take a second.</Header>
              </Modal.Description>
            </Modal.Content>
            <Button onClick={this.props.handleClose}>Cancel</Button>
            <Button onClick={this.handleYes}>Yes!</Button>
            </React.Fragment>
     
        )
        }
    }

