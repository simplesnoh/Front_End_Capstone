import React, { Component } from "react";
import { Form } from 'semantic-ui-react' 
import APIManager from '../modules/APIManager'

/*TODO:
- Add cute photo
- prize form
- submit button
- sets prize
*/

export default class Dashboard extends Component{

    state = {  
     prize: '',
     userId: '',
     id: ''
    };

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
      };
    
    handleEditPrize = (evt) => {
    evt.preventDefault();
        const editedPrize = {
            prize: this.state.prize,
            userId: this.state.userId,
            id: this.state.id
    };
    this.props
        .updateAPI(editedPrize, "userPrize")
        // .then(() => this.props.handleClose())     
        }

    componentDidMount() {
        APIManager.get("userPrize", this.props.userPrize.id)
        .then(prize => {
            this.setState({
                prize: prize.prize,
                userId: prize.userId,
                id: prize.id
            });
        });
        }
  
  
    render(){
          return (
          <div>

          <Form>
          <Form.Group widths='equal'>
            <Form.Field>
            <Form.Input fluid onChange={this.handleFieldChange} id="prize" label='Pick A New Prize' value={this.state.prize} />
            <Form.Button onClick={this.handleEditPrize}>Submit</Form.Button>
           </Form.Field>
        </Form.Group>
        </Form>

        </div>
        )

    }
  }
  