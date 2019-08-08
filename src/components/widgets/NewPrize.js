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

export const getNewWheel = (entity,teamId) => {
   fetch(`${remoteURL}/${entity}?gameEnded=false&teamId=${teamId}`)
    .then(data => data.json())
    .then(data => { 
        console.log("data", data)
    })
    .then(data => {
        return data})
}
export default class Dashboard extends Component{

    state = {  
     prize: '',
     userId: '',
     id: '',
     wheelId: ''
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
    .then(()=> getNewWheel('wheel', +sessionStorage.getItem('teamId')))
    .then(() => {
        console.log("newWheel", this.state.wheelId)
        let newTasks = []
        this.props.tasks.forEach(task => {
            task.wheelId = this.state.wheelId
            task.completed = false
            task.userId = ""
            newTasks.push(task)
        });
        console.log("New Task List", newTasks)
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
    .then(() => this.props.handleClose())     
    }


// .then(()=> APIManager.getCompletedWheel())
// .then(wheel => {
//   const newUserPoints = {
//       teamId: sessionStorage.getItem('teamId'),
//       wheelId: wheel.id,
//       points: 0,
//       userId: sessionStorage.getItem('team')
//   }
//   this.props.addToAPI(newUserPoints, 'userPoints')
//   return wheel
//  .then((wheel) => {
//   const newUserPrize = {
//     prize: this.state.prize,
//     userId: this.state.userId,
//     wheelId: wheel.id
//   }
//   this.props.addToAPI(newUserPrize, 'userPrize')




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
  