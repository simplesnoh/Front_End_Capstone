import React, { Component } from "react";
import { Form, Modal } from 'semantic-ui-react' 
import APIManager from '../modules/APIManager'
import PleaseWait from './PleaseWait'

/*TODO:
- Add cute photo
- prize form
- submit button
- sets prize
*/

const remoteURL = "http://localhost:5002"

export default class TeamNewPrize extends Component{

    state = {  
    open: false,
     prize: '',
     userId: '',
     wheelId: "",
     id: ''
    };

    getNewWheel = (entity,teamId) => {
        fetch(`${remoteURL}/${entity}?gameEnded=false&teamId=${teamId}`)
         .then(data => data.json())
         .then(wheel => {
            const newUserPoints = {
                teamId: +sessionStorage.getItem('teamId'),
                wheelId: wheel[0].id ,
                points: 0,
                userId: sessionStorage.getItem('team')
            }
            this.props.addToAPI(newUserPoints, 'userPoints')
            return wheel
            }).then((wheel)=> {
                const newUserPrize = {
                    prize: this.state.prize,
                    userId: this.state.userId,
                    wheelId: wheel[0].id
                    }
                this.props.addToAPI(newUserPrize, 'userPrize')
            })
     }

    handleFieldChange = (event) => {
        const stateToChange = {};
        stateToChange[event.target.id] = event.target.value
        this.setState(stateToChange)
      };
    
      handleNewRound = (evt) => {
        evt.preventDefault();
            const updateWheelCount = {
                id: this.props.wheel.id,
                completed: this.props.wheel.completed,
                gameEnded: this.props.wheel.gameEnded,
                closedModals: this.props.wheel.closedModals +1,
                ownerId: this.props.wheel.ownerId,
                teamId: this.props.wheel.teamId
            }
            this.props.updateAPI(updateWheelCount, "wheel")
        .then(()=> this.getNewWheel('wheel', +sessionStorage.getItem('teamId')))     
        .then(() => {
            let userPoints = this.props.userPoints.filter(points => points.teamId === this.props.team.id && points.wheelId === this.props.wheel.id )
            console.log("userPoints", userPoints)
            let userList = []
            userPoints.forEach(point => {
                let users = this.props.users.filter(user => user.id === userPoints.userId)
                userList.push(users)
            })
            console.log("userList", userList)
            console.log("user", userList.length-2)
            if(this.props.wheel.closedModals === userList.length-1){
                const updatedWheel = {
                    id: this.props.wheel.id,
                    completed: true,
                    gameEnded: false,
                    closedModals: this.props.wheel.closedModals,
                    ownerId: this.props.wheel.ownerId,
                    teamId: this.props.wheel.teamId
                }
                this.props.updateAPI(updatedWheel, 'wheel')
                .then(() => {
                    this.props.randomizeTasks(this.props.wheel.id)
                    this.props.handleClose()
                })
            }else{
                this.props.handleClose()
                this.props.handleWaitOpenClose(true)
            }
        }) 
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
            <Modal trigger={<Form.Button onClick={this.handleNewRound}>Submit</Form.Button>} open={this.state.open}>
                <PleaseWait handleClose={this.props.handleClose} />
            </Modal>
           </Form.Field>
        </Form.Group>
        </Form>

        </div>
        )

    }
  }
  