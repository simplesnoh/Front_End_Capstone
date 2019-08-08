import React, { Component } from "react";
import { Form } from 'semantic-ui-react' 
import APIManager from '../modules/APIManager'

/*TODO:
- Add cute photo
- prize form
- submit button
- sets prize
*/

const remoteURL = "http://localhost:5002"


export default class Dashboard extends Component{

    state = {  
     prize: '',
     userId: '',
     id: '',
     wheelId: ''
    };

    getNewWheel = (entity,teamId) => {
        fetch(`${remoteURL}/${entity}?gameEnded=false&teamId=${teamId}`)
         .then(data => data.json())
         .then(wheel => {
            console.log(wheel)
            const newUserPoints = {
                teamId: +sessionStorage.getItem('teamId'),
                wheelId: wheel[0].id ,
                points: 0,
                userId: sessionStorage.getItem('team')
            }
            this.props.addToAPI(newUserPoints, 'userPoints')
            return wheel
            })
            .then(wheel => {
            let newTasks = []
            this.props.tasks.forEach(task => {
                const updatedtask ={
                    name: task.name,
                    userId: " ",
                    completed: false,
                    ownerId: task.ownerId,
                    taskTypeId: task.taskTypeId,
                    teamId: task.teamId,
                    wheelId: wheel[0].id 
                }
                newTasks.push(updatedtask)
               return updatedtask
            });
            return newTasks
        })
        .then(newTasks => {
            newTasks.forEach(task => this.props.addToAPI(task, 'tasks'))
        })
        .then(() => this.props.handleClose())
     }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
      };
    
    handleNewRound = (evt) => {
    evt.preventDefault();
    const newUserPrize = {
        prize: this.state.prize,
        userId: this.state.userId
        }
    this.props.updateAPI(newUserPrize, 'userPrize')
    .then(()=> this.getNewWheel('wheel', +sessionStorage.getItem('teamId'))
    )     
    }


    componentDidMount() {
        APIManager.get("userPrize", this.props.userPrize.id)
        .then(prize => {
            this.setState({
                prize: prize.prize,
                userId: prize.userId,
                wheelId: prize.wheelId,
                id: prize.id
            })
        })
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
  