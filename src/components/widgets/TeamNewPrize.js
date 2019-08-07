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
    
    // handleNewRound = (evt) => {
    // evt.preventDefault();
    //     const newPrize = {
    //         prize: this.state.prize,
    //         userId: this.state.userId,
    //         wheelId: ???
    // };
    // this.props
    //     .addToAPI(newPrize, "userPrize")
    //     .then(() => {
    //        const newUserPoints = {
    //            teamId: sessionStorage.getItem('teamId'),
    //            wheelId: ???,
    //            points: 0,
    //            userId: sessionStorage.getItem('team')
    //        }
    //     })
        // .then(() => {
        //     this.props.tasks.map(task=>{
        //         if(this.props.tasks.taskTypeId === 2){
        //             const updatedTask = {
        //                 name: task.name,
        //                 completed: false,
        //                 wheelId: ???,
        //                 taskTypeId: task.taskTypeId,
        //                 teamId: task.teamId
        //             }
        //         }
        //     })
    //     .then(() => this.props.handleClose())     
    //     }

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

        console.log(this.props.tasks)
          return (
          <div>

          <Form>
          <Form.Group widths='equal'>
            <Form.Field>
            <Form.Input fluid onChange={this.handleFieldChange} id="prize" label='Pick A New Prize' value={this.state.prize} />
            <Form.Button onClick={this.handleNewRound}>Submit</Form.Button>
           </Form.Field>
        </Form.Group>
        </Form>

        </div>
        )

    }
  }
  