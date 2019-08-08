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
    
      handleNewRound = (evt) => {
        evt.preventDefault();
            const newUserPoints = {
                teamId: +sessionStorage.getItem('teamId'),
                wheelId: 0,
                points: 0,
                userId: sessionStorage.getItem('team')
            }
        this.props.addToAPI(newUserPoints, 'userPoints')
        .then(() => {
        const newUserPrize = {
            prize: this.state.prize,
            userId: this.state.userId
            }
        this.props.addToAPI(newUserPrize, 'userPrize')
        })
        // .then(()=> {
        //     this.props.tasks.map(task => {
        //         let newTask = {
        //             name: task.name,
        //             completed: false,
        //             userId: task.userId,
        //             taskTypeId: task.taskTypeId,
        //             teamId: task.teamId,
        //             // wheelId: wheel.id,
        //             id: task.id
        //         }
        //     .then(()=> this.props.updateAPI(newTask, 'tasks'))
        //     })
        // })
        .then(() => {
            let userPoints = this.props.userPoints.filter(points => points.teamId === sessionStorage.getItem('teamId'))
            let userList = []
            userPoints.forEach(task => {
                let users = this.props.users.filter(user => user.id === userPoints.userId)
                userList.push(users)
            })
            if(this.props.wheel.closedModals === userList.length-1){

                const updatedWheel = {
                    id: this.props.wheel.id,
                    completed: true,
                    gameEnded: this.props.wheel.gameEnded,
                    closedModals: this.props.wheel.closedModals,
                    ownerId: this.props.wheel.ownerId,
                    teamId: this.props.wheel.teamId
                }
            }
        })
        .then(() => this.props.handleClose())     
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
            <Form.Button onClick={this.handleNewRound}>Submit</Form.Button>
           </Form.Field>
        </Form.Group>
        </Form>

        </div>
        )

    }
  }
  